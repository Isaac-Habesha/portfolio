import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { put } from '@vercel/blob';
import {
  hasBlobStorage,
  isValidProjectId,
  MAX_IMAGES_PER_PROJECT,
  UPLOADS_ROOT,
} from '@/lib/project-images';

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

    const useBlob = hasBlobStorage();
    if (!useBlob && process.env.VERCEL) {
      return NextResponse.json(
        {
          error:
            'Vercel Blob storage is not connected to this deployment (missing BLOB_READ_WRITE_TOKEN). In your Vercel Dashboard, open Storage → Create → Blob (Public), connect it to this project, and trigger a Redeploy.',
        },
        { status: 500 }
      );
    }

    const projectUploadDir = path.join(UPLOADS_ROOT, projectId);
    if (!useBlob) {
      await fs.mkdir(projectUploadDir, { recursive: true });
    }

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

      const safeBase =
        path
          .basename(file.name, path.extname(file.name))
          .toLowerCase()
          .replace(/[^a-z0-9-_]/g, '-')
          .replace(/-+/g, '-')
          .slice(0, 40) || 'screenshot';

      const uniqueName = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}-${safeBase}${ext}`;

      if (useBlob) {
        const blob = await put(`projects/${projectId}/${uniqueName}`, file, {
          access: 'public',
          contentType: file.type,
        });
        uploadedUrls.push(blob.url);
      } else {
        const destination = path.join(projectUploadDir, uniqueName);
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(destination, buffer);
        uploadedUrls.push(`/api/uploads/${projectId}/${uniqueName}`);
      }
    }

    return NextResponse.json({ uploadedUrls });
  } catch (error) {
    console.error('Failed to upload project screenshots:', error);
    const code = (error as NodeJS.ErrnoException | undefined)?.code;
    if (code === 'EROFS' || code === 'EACCES' || code === 'EPERM') {
      return NextResponse.json(
        {
          error:
            'This server has a read-only filesystem. Connect a Vercel Blob store in your Vercel Dashboard (Storage → Create → Blob) and redeploy, or upload screenshots locally via npm run dev.',
        },
        { status: 500 }
      );
    }
    const detail = error instanceof Error ? error.message : 'Please check your storage configuration.';
    return NextResponse.json(
      { error: `Unable to upload images: ${detail}` },
      { status: 500 }
    );
  }
}
