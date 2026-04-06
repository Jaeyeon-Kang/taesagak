import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const GUIDE_DIR = path.join(process.cwd(), 'content', 'guide');

export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  breadcrumb: string;
  keywords: string[];
  datePublished: string;
  dateModified: string;
  order: number;
}

export interface Guide extends GuideMeta {
  source: string;
}

export function getAllGuides(): GuideMeta[] {
  const files = fs.readdirSync(GUIDE_DIR).filter((f) => f.endsWith('.mdx'));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(GUIDE_DIR, file), 'utf-8');
      const { data } = matter(raw);
      return { ...data, slug: file.replace(/\.mdx$/, '') } as GuideMeta;
    })
    .sort((a, b) => a.order - b.order);
}

export function getGuideBySlug(slug: string): Guide {
  const filePath = path.join(GUIDE_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { ...data, slug, source: content } as Guide;
}
