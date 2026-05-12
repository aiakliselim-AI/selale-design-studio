#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import yaml from 'js-yaml';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const categoriesDir = join(root, 'categories');
const outFile = join(root, 'data', 'categories.json');

const files = (await readdir(categoriesDir))
  .filter((f) => f.endsWith('.md'))
  .sort();

const categories = [];
for (const f of files) {
  const txt = await readFile(join(categoriesDir, f), 'utf8');
  const m = txt.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) {
    console.warn(`skipped (no frontmatter): ${f}`);
    continue;
  }
  let data;
  try {
    data = yaml.load(m[1]);
  } catch (e) {
    console.warn(`skipped (yaml error): ${f} — ${e.message}`);
    continue;
  }
  if (!data || typeof data !== 'object') {
    console.warn(`skipped (invalid yaml): ${f}`);
    continue;
  }
  categories.push(data);
}

categories.sort((a, b) => {
  const ao = Number.isFinite(a.order) ? a.order : Number.isFinite(a.id) ? a.id : 0;
  const bo = Number.isFinite(b.order) ? b.order : Number.isFinite(b.id) ? b.id : 0;
  if (ao !== bo) return ao - bo;
  return (a.id ?? 0) - (b.id ?? 0);
});

await writeFile(outFile, JSON.stringify(categories, null, 2) + '\n');
console.log(`wrote ${categories.length} categories to data/categories.json`);
