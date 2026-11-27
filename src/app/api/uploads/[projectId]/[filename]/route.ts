import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { isValidProjectId, UPLOADS_ROOT } from '@/lib/project-images';

export const dynamic = 'force-dynamic';

const EXT_TO_CONTENT_TYPE: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
};

export async function GET(
  _req: Request,
  context: { params: Promise<{ projectId: string; filename: string }> }
) {
  const { projectId, filename } = await context.params;

  if (!isValidProjectId(projectId)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const safeFilename = path.basename(filename);
  if (!safeFilename || safeFilename !== filename) {
    return new NextResponse('Invalid filename', { status: 400 });
  }

  const filePath = path.join(UPLOADS_ROOT, projectId, safeFilename);
  try {
    const data = await fs.readFile(filePath);
    const ext = path.extname(safeFilename).toLowerCase();
    const contentType = EXT_TO_CONTENT_TYPE[ext] ?? 'application/octet-stream';

    return new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Not Found', { status: 404 });
  }
}
