import { NextResponse } from 'next/server';
import {
  hasBlobStorage,
  isValidProjectId,
  MAX_IMAGES_PER_PROJECT,
  readProjectGalleryMap,
  updateProjectGallery,
} from '@/lib/project-images';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const galleries = await readProjectGalleryMap();
    return NextResponse.json({ galleries });
  } catch (error) {
    console.error('Failed to read project galleries:', error);
    return NextResponse.json({ error: 'Unable to load project galleries.' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!hasBlobStorage() && process.env.VERCEL) {
      const blobKeys = Object.keys(process.env).filter(
        (k) => (k.includes('BLOB') || k.includes('READ_WRITE')) && !k.startsWith('VERCEL_')
      );
      return NextResponse.json(
        {
          error: `Vercel Blob token not found in Production runtime (detected keys: ${
            blobKeys.length > 0 ? blobKeys.join(', ') : 'none'
          }). Ensure BLOB_READ_WRITE_TOKEN is enabled for Production in Vercel Settings → Environment Variables, then redeploy.`,
        },
        { status: 500 }
      );
    }

    const body = (await req.json()) as { projectId?: unknown; images?: unknown };
    const projectId = typeof body.projectId === 'string' ? body.projectId : '';
    if (!isValidProjectId(projectId)) {
      return NextResponse.json({ error: 'Invalid project ID.' }, { status: 400 });
    }

    if (!Array.isArray(body.images)) {
      return NextResponse.json({ error: 'Images must be an array.' }, { status: 400 });
    }

    if (body.images.length > MAX_IMAGES_PER_PROJECT) {
      return NextResponse.json(
        { error: `A maximum of ${MAX_IMAGES_PER_PROJECT} images per project is allowed.` },
        { status: 400 }
      );
    }

    const sanitizedImages = body.images.filter((item): item is string => typeof item === 'string');
    const galleries = await updateProjectGallery(projectId, sanitizedImages);
    return NextResponse.json({ galleries });
  } catch (error) {
    console.error('Failed to update project gallery:', error);
    const code = (error as NodeJS.ErrnoException | undefined)?.code;
    if (code === 'EROFS' || code === 'EACCES' || code === 'EPERM') {
      return NextResponse.json(
        {
          error:
            'This server has a read-only filesystem. Connect a Vercel Blob store in your Vercel Dashboard (Storage → Create → Blob) and redeploy, or save screenshots locally via npm run dev.',
        },
        { status: 500 }
      );
    }
    const detail = error instanceof Error ? error.message : 'Please check your storage configuration.';
    return NextResponse.json(
      { error: `Unable to save project gallery: ${detail}` },
      { status: 500 }
    );
  }
}
