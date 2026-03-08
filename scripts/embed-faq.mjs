#!/usr/bin/env node
/**
 * Generates embeddings for FAQ content using Transformers.js.
 * Run before build: npm run embed-faq
 * Output: public/faq-embeddings.json
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { pipeline } from '@xenova/transformers';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const faqPath = join(root, 'src/data/faq.json');
const outPath = join(root, 'public/faq-embeddings.json');

async function main() {
  if (existsSync(outPath)) {
    console.log('faq-embeddings.json exists. Run with --force to regenerate.');
    const force = process.argv.includes('--force');
    if (!force) process.exit(0);
  }
  console.log('Loading FAQ data...');
  const faq = JSON.parse(readFileSync(faqPath, 'utf-8'));

  console.log('Loading embedding model (Xenova/all-MiniLM-L6-v2)...');
  const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
    quantized: true,
  });

  console.log('Generating embeddings...');
  const results = [];
  for (let i = 0; i < faq.length; i++) {
    const chunk = faq[i];
    const output = await extractor(chunk.text, { pooling: 'mean', normalize: true });
    let embedding = output;
    if (Array.isArray(output) && Array.isArray(output[0])) embedding = output[0];
    else if (output?.data) embedding = Array.from(output.data);
    else if (!Array.isArray(embedding)) embedding = Array.from(output);
    results.push({
      id: chunk.id,
      answer: chunk.answer,
      link: chunk.link,
      embedding: Array.isArray(embedding) ? embedding : Array.from(embedding),
    });
    if ((i + 1) % 5 === 0) console.log(`  Embedded ${i + 1}/${faq.length}`);
  }

  writeFileSync(outPath, JSON.stringify(results), 'utf-8');
  console.log(`Done. Wrote ${results.length} embeddings to public/faq-embeddings.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
