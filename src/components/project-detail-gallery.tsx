"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ImageOff,
  Images,
} from 'lucide-react';

export function ProjectDetailGallery({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const coverImage = images[0];
  const showcaseImages = images.slice(1);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrevLightbox = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || images.length === 0) return null;
      return (prev - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const showNextLightbox = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || images.length === 0) return null;
      return (prev + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrevLightbox();
      if (e.key === 'ArrowRight') showNextLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, showPrevLightbox, showNextLightbox]);

  if (images.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/15 bg-slate-950/40 p-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400">
          <ImageOff className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-white">No screenshots uploaded yet</h2>
        <p className="mt-2 max-w-md text-xs leading-5 text-slate-400">
          Add a main cover image and up to four showcase screenshots for this project using the Gallery Manager.
        </p>
        <Link href="/projects/manage" className="button-secondary mt-5 text-xs">
          <Images className="mr-2 h-4 w-4" />
          Upload Screenshots
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Cover Image */}
      <div className="glass-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/50">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage}
            alt={`${title} main cover screenshot`}
            onClick={() => setLightboxIndex(0)}
            className="h-full w-full cursor-zoom-in object-cover transition duration-500 group-hover:scale-[1.02]"
          />
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            aria-label="View cover image full screen"
            className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/80 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md transition hover:border-accent hover:text-accent"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Full Screen
          </button>
        </div>
      </div>

      {/* Showcase Carousel (Remaining Screenshots) */}
      {showcaseImages.length > 0 && (
        <div className="glass-card rounded-[2rem] border border-white/10 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-accent">
                Application Showcase
              </p>
              <p className="text-xs text-slate-400">
                Screenshot {showcaseIndex + 1} of {showcaseImages.length} — click image to view full screen
              </p>
            </div>

            {showcaseImages.length > 1 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous showcase screenshot"
                  onClick={() =>
                    setShowcaseIndex((prev) => (prev - 1 + showcaseImages.length) % showcaseImages.length)
                  }
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:border-accent/50 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next showcase screenshot"
                  onClick={() =>
                    setShowcaseIndex((prev) => (prev + 1) % showcaseImages.length)
                  }
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:border-accent/50 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Active Showcase Slide */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={showcaseImages[showcaseIndex]}
              alt={`${title} showcase screenshot ${showcaseIndex + 1}`}
              onClick={() => setLightboxIndex(showcaseIndex + 1)}
              className="h-full w-full cursor-zoom-in object-cover"
            />
            <button
              type="button"
              onClick={() => setLightboxIndex(showcaseIndex + 1)}
              aria-label="View showcase image full screen"
              className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition hover:border-accent hover:text-accent"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              Expand
            </button>
          </div>

          {/* Thumbnails */}
          {showcaseImages.length > 1 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {showcaseImages.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setShowcaseIndex(idx)}
                  className={`relative aspect-video overflow-hidden rounded-xl border transition ${
                    idx === showcaseIndex
                      ? 'border-accent ring-2 ring-accent/40'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${title} thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Full-Screen Lightbox Modal */}
      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full screen screenshot viewer"
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-xl"
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close full screen viewer"
            className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-slate-900/90 p-2.5 text-white transition hover:border-accent hover:text-accent"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrevLightbox();
                }}
                aria-label="Previous image"
                className="absolute left-4 z-10 rounded-full border border-white/20 bg-slate-900/90 p-3 text-white transition hover:border-accent hover:text-accent"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNextLightbox();
                }}
                aria-label="Next image"
                className="absolute right-4 z-10 rounded-full border border-white/20 bg-slate-900/90 p-3 text-white transition hover:border-accent hover:text-accent"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[88vh] max-w-[92vw] flex-col items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightboxIndex]}
              alt={`${title} full-screen view ${lightboxIndex + 1}`}
              className="max-h-[82vh] max-w-full rounded-2xl border border-white/10 object-contain shadow-2xl"
            />
            <p className="mt-3 text-xs font-medium text-slate-300">
              {lightboxIndex === 0 ? 'Main Cover' : `Showcase ${lightboxIndex}`} • {lightboxIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
