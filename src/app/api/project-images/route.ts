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
    return NextResponse.json(
      { error: 'Unable to save project gallery. Ensure the server has write permissions.' },
      { status: 500 }
    );
  }
}
