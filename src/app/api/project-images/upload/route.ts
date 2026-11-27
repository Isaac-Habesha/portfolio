import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { isValidProjectId, MAX_IMAGES_PER_PROJECT, UPLOADS_ROOT } from '@/lib/project-images';

export const dynamic = 'force-dynamic';

const ALLOWED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif']);
const MIME_TO_EXT: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/avif': '.avif',
};
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const projectIdValue = formData.get('projectId');
    const projectId = typeof projectIdValue === 'string' ? projectIdValue : '';

    if (!isValidProjectId(projectId)) {
      return NextResponse.json({ error: 'Invalid project ID.' }, { status: 400 });
    }

    const fileEntries = formData.getAll('files').filter((entry): entry is File => entry instanceof File);
    if (fileEntries.length === 0) {
      return NextResponse.json({ error: 'No image files were provided.' }, { status: 400 });
    }

    if (fileEntries.length > MAX_IMAGES_PER_PROJECT) {
      return NextResponse.json(
        { error: `You can upload at most ${MAX_IMAGES_PER_PROJECT} images at once.` },
        { status: 400 }
      );
    }

    const projectUploadDir = path.join(UPLOADS_ROOT, projectId);
    await fs.mkdir(projectUploadDir, { recursive: true });

    const uploadedUrls: string[] = [];

    for (const file of fileEntries) {
      if (!file.type.startsWith('image/')) {
        return NextResponse.json({ error: `Unsupported file type for "${file.name}".` }, { status: 400 });
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: `"${file.name}" exceeds the 10MB file size limit.` },
          { status: 400 }
        );
      }

      const originalExt = path.extname(file.name).toLowerCase();
      const ext = ALLOWED_EXTENSIONS.has(originalExt)
        ? originalExt
        : (MIME_TO_EXT[file.type] ?? '.png');

      const safeBase = path
        .basename(file.name, path.extname(file.name))
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 40) || 'screenshot';

      const uniqueName = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}-${safeBase}${ext}`;
      const destination = path.join(projectUploadDir, uniqueName);
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(destination, buffer);

      uploadedUrls.push(`/api/uploads/${projectId}/${uniqueName}`);
    }

    return NextResponse.json({ uploadedUrls });
  } catch (error) {
    console.error('Failed to upload project screenshots:', error);
    return NextResponse.json(
      { error: 'Unable to upload images. Ensure the server has write permissions.' },
      { status: 500 }
    );
  }
}
