import { promises as fs } from 'fs';
import path from 'path';
import { projects } from '@/data/portfolio';

export const MAX_IMAGES_PER_PROJECT = 5;

const CONFIG_PATH = path.join(process.cwd(), 'data', 'project-images.json');
export const UPLOADS_ROOT = path.join(process.cwd(), 'uploads', 'projects');

export type ProjectGalleryMap = Record<string, string[]>;

const validProjectIds = new Set(projects.map((project) => project.id));

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

export async function readProjectGalleryMap(): Promise<ProjectGalleryMap> {
  const base = buildEmptyGalleryMap();
  try {
    const raw = await fs.readFile(CONFIG_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    for (const project of projects) {
      const entry = parsed[project.id];
      if (Array.isArray(entry)) {
        base[project.id] = entry
          .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
          .slice(0, MAX_IMAGES_PER_PROJECT);
      }
    }
  } catch {
    // Return empty map if config does not exist yet
  }
  return base;
}

export async function getProjectImages(projectId: string): Promise<string[]> {
  if (!isValidProjectId(projectId)) return [];
  const map = await readProjectGalleryMap();
  return map[projectId] ?? [];
}

export async function writeProjectGalleryMap(map: ProjectGalleryMap): Promise<void> {
  await fs.mkdir(path.dirname(CONFIG_PATH), { recursive: true });
  await fs.writeFile(CONFIG_PATH, JSON.stringify(map, null, 2), 'utf-8');
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

  // Clean up any local uploaded files that were removed from this project's gallery
  const removed = previousImages.filter((url) => !sanitized.includes(url));
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
