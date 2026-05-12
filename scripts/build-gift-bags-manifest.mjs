#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import yaml from 'js-yaml';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

async function build(srcDir, outFile, label) {
  let files;
  try {
    files = (await readdir(srcDir)).filter((f) => f.endsWith('.md')).sort();
  } catch (e) {
    console.warn(`${label}: dizin okunamadı (${e.code || e.message}), boş manifest yazılıyor.`);
    await writeFile(outFile, '[]\n');
    return;
  }
  const items = [];
  for (const f of files) {
    const txt = await readFile(join(srcDir, f), 'utf8');
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
    items.push(data);
  }
  items.sort((a, b) => {
    const ao = Number.isFinite(a.order) ? a.order : 0;
    const bo = Number.isFinite(b.order) ? b.order : 0;
    if (ao !== bo) return ao - bo;
    return String(a.title || '').localeCompare(String(b.title || ''), 'tr');
  });
  await writeFile(outFile, JSON.stringify(items, null, 2) + '\n');
  console.log(`wrote ${items.length} ${label} to ${outFile.replace(root + '/', '').replace(root + '\\', '')}`);
}

await build(join(root, 'gift-bags'),      join(root, 'data', 'gift-bags.json'),      'gift bags');
await build(join(root, 'gift-bag-items'), join(root, 'data', 'gift-bag-items.json'), 'gift bag items');
