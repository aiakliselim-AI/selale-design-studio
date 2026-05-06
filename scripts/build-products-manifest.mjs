#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import yaml from 'js-yaml';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const productsDir = join(root, 'products');
const outFile = join(root, 'data', 'products.json');

const files = (await readdir(productsDir))
  .filter((f) => f.endsWith('.md'))
  .sort();

const products = [];
for (const f of files) {
  const txt = await readFile(join(productsDir, f), 'utf8');
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
  products.push(data);
}

products.sort((a, b) => {
  const ao = Number.isFinite(a.order) ? a.order : Number.isFinite(a.id) ? a.id : 0;
  const bo = Number.isFinite(b.order) ? b.order : Number.isFinite(b.id) ? b.id : 0;
  if (ao !== bo) return ao - bo;
  return (a.id ?? 0) - (b.id ?? 0);
});

await writeFile(outFile, JSON.stringify(products, null, 2) + '\n');
console.log(`wrote ${products.length} products to data/products.json`);
