import { NextResponse } from 'next/server';
import {
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
    return NextResponse.json(
      { error: 'Unable to save project gallery. Please check your storage configuration.' },
      { status: 500 }
    );
  }
}
