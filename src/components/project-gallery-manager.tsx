"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Upload,
  Trash2,
  RefreshCw,
  GripVertical,
  Star,
  ImagePlus,
  Save,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { projects } from '@/data/portfolio';

const MAX_IMAGES = 5;

type DraftImage = {
  id: string;
  url: string;
  file?: File;
  isNew: boolean;
};

type ProjectGalleryMap = Record<string, string[]>;

function toDraftImages(urls: string[]): DraftImage[] {
  return urls.slice(0, MAX_IMAGES).map((url, idx) => ({
    id: `saved-${idx}-${url}`,
    url,
    isNew: false,
  }));
}

export function ProjectGalleryManager({ initialGalleries }: { initialGalleries: ProjectGalleryMap }) {
  const [savedGalleries, setSavedGalleries] = useState<ProjectGalleryMap>(initialGalleries);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id ?? '');
  const [draftsByProject, setDraftsByProject] = useState<Record<string, DraftImage[]>>(() => {
    const init: Record<string, DraftImage[]> = {};
    for (const project of projects) {
      init[project.id] = toDraftImages(initialGalleries[project.id] ?? []);
    }
    return init;
  });

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [draggedSlotIndex, setDraggedSlotIndex] = useState<number | null>(null);
  const [dragOverSlotIndex, setDragOverSlotIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const replaceInputRef = useRef<HTMLInputElement | null>(null);
  const replaceTargetIndexRef = useRef<number | null>(null);

  const currentProject = projects.find((p) => p.id === selectedProjectId) ?? projects[0];
  const currentDrafts = draftsByProject[selectedProjectId] ?? [];
  const savedForCurrent = savedGalleries[selectedProjectId] ?? [];

  const hasUnsavedChanges = (() => {
    if (currentDrafts.length !== savedForCurrent.length) return true;
    return currentDrafts.some((item, idx) => item.isNew || item.url !== savedForCurrent[idx]);
  })();

  // Revoke object URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(draftsByProject)
        .flat()
        .forEach((item) => {
          if (item.isNew && item.url.startsWith('blob:')) {
            URL.revokeObjectURL(item.url);
          }
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCurrentDrafts = useCallback(
    (updater: (prev: DraftImage[]) => DraftImage[]) => {
      setFeedback(null);
      setDraftsByProject((prev) => ({
        ...prev,
        [selectedProjectId]: updater(prev[selectedProjectId] ?? []),
      }));
    },
    [selectedProjectId]
  );

  const handleAddFiles = useCallback(
    (fileList: FileList | File[]) => {
      const files = Array.from(fileList).filter((file) => file.type.startsWith('image/'));
      if (files.length === 0) {
        setFeedback({ type: 'error', message: 'Please select valid image files (PNG, JPG, WebP, GIF, or AVIF).' });
        return;
      }

      updateCurrentDrafts((prev) => {
        const remainingSlots = MAX_IMAGES - prev.length;
        if (remainingSlots <= 0) {
          setFeedback({
            type: 'error',
            message: `Maximum of ${MAX_IMAGES} images reached for this project. Remove or replace an existing image first.`,
          });
          return prev;
        }

        const accepted = files.slice(0, remainingSlots);
        if (files.length > remainingSlots) {
          setFeedback({
            type: 'error',
            message: `Only ${remainingSlots} slot(s) remaining. Extra images were skipped (max ${MAX_IMAGES} per project).`,
          });
        }

        const newDrafts: DraftImage[] = accepted.map((file, idx) => ({
          id: `new-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 7)}`,
          url: URL.createObjectURL(file),
          file,
          isNew: true,
        }));

        return [...prev, ...newDrafts];
      });
    },
    [updateCurrentDrafts]
  );

  const handleReplaceFile = (index: number, file: File) => {
    if (!file.type.startsWith('image/')) {
      setFeedback({ type: 'error', message: 'Please select a valid image file.' });
      return;
    }

    updateCurrentDrafts((prev) =>
      prev.map((item, idx) => {
        if (idx !== index) return item;
        if (item.isNew && item.url.startsWith('blob:')) {
          URL.revokeObjectURL(item.url);
        }
        return {
          id: `replace-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          url: URL.createObjectURL(file),
          file,
          isNew: true,
        };
      })
    );
  };

  const handleRemoveImage = (index: number) => {
    updateCurrentDrafts((prev) => {
      const target = prev[index];
      if (target?.isNew && target.url.startsWith('blob:')) {
        URL.revokeObjectURL(target.url);
      }
      return prev.filter((_, idx) => idx !== index);
    });
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= currentDrafts.length) return;
    updateCurrentDrafts((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  const handleDiscard = () => {
    setFeedback(null);
    setDraftsByProject((prev) => {
      (prev[selectedProjectId] ?? []).forEach((item) => {
        if (item.isNew && item.url.startsWith('blob:')) {
          URL.revokeObjectURL(item.url);
        }
      });
      return {
        ...prev,
        [selectedProjectId]: toDraftImages(savedGalleries[selectedProjectId] ?? []),
      };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFeedback(null);

    try {
      const stagedFiles = currentDrafts.filter((item) => item.isNew && item.file);
      let uploadedUrls: string[] = [];

      if (stagedFiles.length > 0) {
        const formData = new FormData();
        formData.append('projectId', selectedProjectId);
        for (const item of stagedFiles) {
          if (item.file) {
            formData.append('files', item.file);
          }
        }

        const uploadRes = await fetch('/api/project-images/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = (await uploadRes.json()) as { uploadedUrls?: string[]; error?: string };
        if (!uploadRes.ok || !uploadData.uploadedUrls) {
          throw new Error(uploadData.error ?? 'Failed to upload image files.');
        }
        uploadedUrls = uploadData.uploadedUrls;
      }

      let uploadCursor = 0;
      const finalUrls = currentDrafts.map((item) => {
        if (item.isNew) {
          const resolved = uploadedUrls[uploadCursor];
          uploadCursor += 1;
          return resolved;
        }
        return item.url;
      });

      const saveRes = await fetch('/api/project-images', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: selectedProjectId,
          images: finalUrls,
        }),
      });

      const saveData = (await saveRes.json()) as { galleries?: ProjectGalleryMap; error?: string };
      if (!saveRes.ok || !saveData.galleries) {
        throw new Error(saveData.error ?? 'Failed to save gallery configuration.');
      }

      // Clean up temporary blob URLs
      currentDrafts.forEach((item) => {
        if (item.isNew && item.url.startsWith('blob:')) {
          URL.revokeObjectURL(item.url);
        }
      });

      setSavedGalleries(saveData.galleries);
      setDraftsByProject((prev) => ({
        ...prev,
        [selectedProjectId]: toDraftImages(saveData.galleries?.[selectedProjectId] ?? finalUrls),
      }));

      setFeedback({
        type: 'success',
        message: `Gallery saved for "${currentProject.title}". Changes are now live on the Projects page.`,
      });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred while saving.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      {/* Project Selector Sidebar */}
      <aside className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-accent">Select Project</p>
        <div className="space-y-2">
          {projects.map((project) => {
            const count = (draftsByProject[project.id] ?? []).length;
            const isSelected = project.id === selectedProjectId;
            const saved = savedGalleries[project.id] ?? [];
            const draft = draftsByProject[project.id] ?? [];
            const dirty =
              draft.length !== saved.length ||
              draft.some((item, idx) => item.isNew || item.url !== saved[idx]);

            return (
              <button
                key={project.id}
                type="button"
                onClick={() => {
                  setSelectedProjectId(project.id);
                  setFeedback(null);
                }}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  isSelected
                    ? 'border-accent bg-accent/10 shadow-md shadow-accent/10'
                    : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {project.title}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                      count > 0
                        ? 'border border-accent/30 bg-accent/15 text-accent'
                        : 'border border-white/10 bg-white/5 text-slate-400'
                    }`}
                  >
                    {count}/{MAX_IMAGES}
                  </span>
                </div>
                {dirty && (
                  <p className="mt-1.5 text-[11px] font-medium text-amber-300">Unsaved changes</p>
                )}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Active Project Gallery Workspace */}
      <div className="glass-card rounded-[2rem] border border-white/10 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-accent">
              Managing Gallery ({currentDrafts.length} of {MAX_IMAGES} images)
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white">{currentProject.title}</h2>
            <p className="mt-1 text-xs text-slate-400">
              Slot 1 is used as the main cover image. Drag and drop cards to reorder, or upload up to 5 screenshots.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href={`/projects/${currentProject.id}`}
              className="button-secondary text-xs"
            >
              View Project Page
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Feedback Banner */}
        {feedback && (
          <div
            className={`flex items-center gap-3 rounded-2xl border p-4 text-sm ${
              feedback.type === 'success'
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                : 'border-rose-500/30 bg-rose-500/10 text-rose-200'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Drag-and-Drop Upload Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            if (draggedSlotIndex === null) {
              setIsDraggingFile(true);
            }
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDraggingFile(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDraggingFile(false);
            if (draggedSlotIndex !== null) return;
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
              handleAddFiles(e.dataTransfer.files);
            }
          }}
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
            isDraggingFile
              ? 'border-accent bg-accent/10'
              : 'border-white/15 bg-slate-950/40 hover:border-accent/50'
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
            <Upload className="h-6 w-6" />
          </div>
          <p className="mt-4 text-sm font-semibold text-white">
            Drag & drop screenshots here, or click to browse
          </p>
          <p className="mt-1 text-xs text-slate-400">
            PNG, JPG, WebP, GIF, or AVIF (max 10MB each). Up to {MAX_IMAGES - currentDrafts.length} more image(s) can be added.
          </p>
          <button
            type="button"
            disabled={currentDrafts.length >= MAX_IMAGES}
            onClick={() => fileInputRef.current?.click()}
            className="button-secondary mt-4 text-xs disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            Select Images
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleAddFiles(e.target.files);
                e.target.value = '';
              }
            }}
          />

          <input
            ref={replaceInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const targetIdx = replaceTargetIndexRef.current;
              const file = e.target.files?.[0];
              if (targetIdx !== null && file) {
                handleReplaceFile(targetIdx, file);
              }
              replaceTargetIndexRef.current = null;
              e.target.value = '';
            }}
          />
        </div>

        {/* 5-Slot Gallery Grid (1 Cover + 4 Showcase) */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: MAX_IMAGES }).map((_, slotIdx) => {
            const item = currentDrafts[slotIdx];
            const isCover = slotIdx === 0;
            const isDragOver = dragOverSlotIndex === slotIdx;

            if (!item) {
              return (
                <div
                  key={`empty-${slotIdx}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverSlotIndex(slotIdx);
                  }}
                  onDragLeave={() => setDragOverSlotIndex(null)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOverSlotIndex(null);
                    if (draggedSlotIndex !== null) {
                      moveImage(draggedSlotIndex, Math.min(slotIdx, currentDrafts.length - 1));
                      setDraggedSlotIndex(null);
                    } else if (e.dataTransfer.files?.length) {
                      handleAddFiles(e.dataTransfer.files);
                    }
                  }}
                  className={`flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed p-4 text-center transition ${
                    isDragOver
                      ? 'border-accent bg-accent/10'
                      : 'border-white/10 bg-slate-950/30'
                  }`}
                >
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold text-slate-400">
                    {isCover ? 'Slot 1 • Main Cover' : `Slot ${slotIdx + 1} • Showcase`}
                  </span>
                  <p className="mt-2 text-xs text-slate-500">Empty slot</p>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                draggable
                onDragStart={() => setDraggedSlotIndex(slotIdx)}
                onDragEnd={() => {
                  setDraggedSlotIndex(null);
                  setDragOverSlotIndex(null);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (draggedSlotIndex !== null && draggedSlotIndex !== slotIdx) {
                    setDragOverSlotIndex(slotIdx);
                  }
                }}
                onDragLeave={() => setDragOverSlotIndex(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOverSlotIndex(null);
                  if (draggedSlotIndex !== null) {
                    moveImage(draggedSlotIndex, slotIdx);
                    setDraggedSlotIndex(null);
                  } else if (e.dataTransfer.files?.[0]) {
                    handleReplaceFile(slotIdx, e.dataTransfer.files[0]);
                  }
                }}
                className={`group flex flex-col overflow-hidden rounded-2xl border bg-slate-950/60 transition ${
                  isDragOver
                    ? 'border-accent ring-2 ring-accent/40'
                    : isCover
                    ? 'border-accent/40'
                    : 'border-white/10 hover:border-white/25'
                }`}
              >
                {/* Header bar */}
                <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <GripVertical className="h-4 w-4 cursor-grab text-slate-400 active:cursor-grabbing" />
                    {isCover ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-bold text-accent">
                        <Star className="h-3 w-3" />
                        Main Cover
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-300">
                        Showcase #{slotIdx}
                      </span>
                    )}
                  </div>
                  {item.isNew && (
                    <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                      Preview
                    </span>
                  )}
                </div>

                {/* Image Preview */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={`${currentProject.title} preview ${slotIdx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between gap-1 border-t border-white/10 p-2.5">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={slotIdx === 0}
                      onClick={() => moveImage(slotIdx, slotIdx - 1)}
                      title="Move earlier"
                      className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-300 transition hover:border-accent/40 hover:text-white disabled:opacity-30"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={slotIdx === currentDrafts.length - 1}
                      onClick={() => moveImage(slotIdx, slotIdx + 1)}
                      title="Move later"
                      className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-300 transition hover:border-accent/40 hover:text-white disabled:opacity-30"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        replaceTargetIndexRef.current = slotIdx;
                        replaceInputRef.current?.click();
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-medium text-slate-200 transition hover:border-accent/40 hover:text-white"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(slotIdx)}
                      title="Remove image"
                      className="inline-flex items-center gap-1 rounded-lg border border-rose-500/20 bg-rose-500/10 px-2.5 py-1.5 text-[11px] font-medium text-rose-300 transition hover:border-rose-400/50 hover:bg-rose-500/20"
                    >
                      <Trash2 className="h-3 w-3" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Save / Discard Footer */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">
            {hasUnsavedChanges
              ? 'You have unsaved preview changes. Click Save Gallery to publish them.'
              : 'All gallery changes are saved.'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={!hasUnsavedChanges || isSaving}
              onClick={handleDiscard}
              className="button-secondary text-xs disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              Discard Changes
            </button>
            <button
              type="button"
              disabled={!hasUnsavedChanges || isSaving}
              onClick={handleSave}
              className="button-primary text-xs disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Save className="mr-1.5 h-3.5 w-3.5" />
              {isSaving ? 'Saving...' : 'Save Gallery'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
