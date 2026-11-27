import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Images } from 'lucide-react';
import { readProjectGalleryMap } from '@/lib/project-images';
import { ProjectGalleryManager } from '@/components/project-gallery-manager';
import { FadeIn } from '@/components/motion';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Manage Project Screenshots',
  description: 'Upload, preview, reorder, replace, and manage screenshots for each portfolio project.',
};

export default async function ManageProjectImagesPage() {
  const initialGalleries = await readProjectGalleryMap();

  return (
    <main id="main-content" className="py-12 sm:py-16 lg:py-20">
      <section className="section-shell">
        <FadeIn>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="pill">
                <Images className="mr-2 h-4 w-4 text-accent" />
                Project Gallery Manager
              </span>
            </div>

            <Link href="/projects" className="button-secondary text-xs">
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              Back to Projects
            </Link>
          </div>

          <h1 className="mt-6 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Manage <span className="text-accent">Project Screenshots</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Upload, preview, replace, remove, and drag-and-drop reorder up to 5 screenshots per project (1 main cover image + up to 4 showcase images) without editing code.
          </p>
        </FadeIn>

        <div className="mt-10">
          <ProjectGalleryManager initialGalleries={initialGalleries} />
        </div>
      </section>
    </main>
  );
}
