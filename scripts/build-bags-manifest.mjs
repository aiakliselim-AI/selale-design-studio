#!/usr/bin/env node
// data/bags/*.json -> data/bags.json (manifest)
// Yeni "Cantanizi siz doldurun" builder'i icin cantalarin manifestini uretir.
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const bagsDir = join(root, 'data', 'bags');
const outFile = join(root, 'data', 'bags.json');

let files = [];
try {
  files = (await readdir(bagsDir))
    .filter((f) => f.endsWith('.json'))
    .sort();
} catch (e) {
  if (e.code === 'ENOENT') {
    console.warn(`bags dir not found (${bagsDir}); writing empty manifest`);
    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, '[]\n');
    process.exit(0);
  }
  throw e;
}

const bags = [];
for (const f of files) {
  const txt = await readFile(join(bagsDir, f), 'utf8');
  let data;
  try {
    data = JSON.parse(txt);
  } catch (e) {
    console.warn(`skipped (json parse error): ${f} - ${e.message}`);
    continue;
  }
  if (!data || typeof data !== 'object') {
    console.warn(`skipped (invalid json): ${f}`);
    continue;
  }
  // id fallback: dosya adi
  if (!data.id) data.id = f.replace(/\.json$/, '');
  bags.push(data);
}

bags.sort((a, b) => {
  const ao = Number.isFinite(a.order) ? a.order : 9999;
  const bo = Number.isFinite(b.order) ? b.order : 9999;
  if (ao !== bo) return ao - bo;
  return String(a.id || '').localeCompare(String(b.id || ''));
});

await writeFile(outFile, JSON.stringify(bags, null, 2) + '\n');
console.log(`wrote ${bags.length} bags to data/bags.json`);
