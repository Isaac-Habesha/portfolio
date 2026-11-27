import { promises as fs } from 'fs';
import path from 'path';
import { del, list, put } from '@vercel/blob';
import { projects } from '@/data/portfolio';

export const MAX_IMAGES_PER_PROJECT = 5;

const CONFIG_PATH = path.join(process.cwd(), 'data', 'project-images.json');
const BLOB_CONFIG_PATH = 'config/project-images.json';
export const UPLOADS_ROOT = path.join(process.cwd(), 'uploads', 'projects');

export type ProjectGalleryMap = Record<string, string[]>;

const validProjectIds = new Set(projects.map((project) => project.id));

export function hasBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function isValidProjectId(projectId: string): boolean {
  return validProjectIds.has(projectId);
}

function buildEmptyGalleryMap(): ProjectGalleryMap {
  const map: ProjectGalleryMap = {};
  for (const project of projects) {
    map[project.id] = [];
  }
  return map;
}

function sanitizeGalleryMap(parsed: Record<string, unknown>): ProjectGalleryMap {
  const base = buildEmptyGalleryMap();
  for (const project of projects) {
    const entry = parsed[project.id];
    if (Array.isArray(entry)) {
      base[project.id] = entry
        .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
        .slice(0, MAX_IMAGES_PER_PROJECT);
    }
  }
  return base;
}

async function readLocalGalleryMap(): Promise<ProjectGalleryMap> {
  try {
    const raw = await fs.readFile(CONFIG_PATH, 'utf-8');
    return sanitizeGalleryMap(JSON.parse(raw) as Record<string, unknown>);
  } catch {
    return buildEmptyGalleryMap();
  }
}

export async function readProjectGalleryMap(): Promise<ProjectGalleryMap> {
  if (hasBlobStorage()) {
    try {
      const { blobs } = await list({ prefix: BLOB_CONFIG_PATH, limit: 1 });
      const configBlob = blobs.find((b) => b.pathname === BLOB_CONFIG_PATH) ?? blobs[0];
      if (configBlob?.url) {
        const res = await fetch(configBlob.url, { cache: 'no-store' });
        if (res.ok) {
          const parsed = (await res.json()) as Record<string, unknown>;
          return sanitizeGalleryMap(parsed);
        }
      }
    } catch {
      // Fall back to local config file if Blob config does not exist yet
    }
  }
  return readLocalGalleryMap();
}

export async function getProjectImages(projectId: string): Promise<string[]> {
  if (!isValidProjectId(projectId)) return [];
  const map = await readProjectGalleryMap();
  return map[projectId] ?? [];
}

export async function writeProjectGalleryMap(map: ProjectGalleryMap): Promise<void> {
  const serialized = JSON.stringify(map, null, 2);
  if (hasBlobStorage()) {
    await put(BLOB_CONFIG_PATH, serialized, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
    });
    return;
  }
  await fs.mkdir(path.dirname(CONFIG_PATH), { recursive: true });
  await fs.writeFile(CONFIG_PATH, serialized, 'utf-8');
}

export async function updateProjectGallery(projectId: string, images: string[]): Promise<ProjectGalleryMap> {
  if (!isValidProjectId(projectId)) {
    throw new Error('Invalid project ID');
  }
  const sanitized = images
    .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    .slice(0, MAX_IMAGES_PER_PROJECT);

  const currentMap = await readProjectGalleryMap();
  const previousImages = currentMap[projectId] ?? [];
  const nextMap: ProjectGalleryMap = {
    ...currentMap,
    [projectId]: sanitized,
  };

  await writeProjectGalleryMap(nextMap);

  const removed = previousImages.filter((url) => !sanitized.includes(url));

  // Clean up removed Vercel Blob images
  if (hasBlobStorage()) {
    const blobUrlsToDelete = removed.filter((url) => url.includes('blob.vercel-storage.com'));
    if (blobUrlsToDelete.length > 0) {
      try {
        await del(blobUrlsToDelete);
      } catch {
        // Ignore cleanup failure
      }
    }
  }

  // Clean up removed local uploaded files
  const prefix = `/api/uploads/${projectId}/`;
  for (const url of removed) {
    if (url.startsWith(prefix)) {
      const filename = path.basename(url);
      const filePath = path.join(UPLOADS_ROOT, projectId, filename);
      try {
        await fs.unlink(filePath);
      } catch {
        // Ignore if already deleted
      }
    }
  }

  return nextMap;
}
