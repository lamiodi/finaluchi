// One-off upload for products/upload-batch — pushes the nine batch photos to
// Cloudinary under the public ids in cloudinary-mapping.csv, verifies each
// delivery URL, and writes the URLs back into the CSV.
//
// Usage:  node scripts/upload-to-cloudinary.mjs
// Needs:  CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name> in backend/.env

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const batchDir = path.resolve(__dirname, '../../products/upload-batch');
const imagesDir = path.join(batchDir, 'images');
const csvPath = path.join(batchDir, 'cloudinary-mapping.csv');

// Parse CLOUDINARY_URL ourselves so a malformed value fails loudly here
// instead of surfacing as a cryptic SDK auth error mid-upload.
const urlMatch = (process.env.CLOUDINARY_URL || '').match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
if (!urlMatch) {
  console.error('CLOUDINARY_URL is missing or malformed in backend/.env — expected cloudinary://<key>:<secret>@<cloud_name>');
  process.exit(1);
}
const [, apiKey, apiSecret, cloudName] = urlMatch;
cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

const rows = fs.readFileSync(csvPath, 'utf-8')
  .split(/\r?\n/)
  .filter((line) => line.trim() && !line.startsWith('file_name,'))
  .map((line) => line.split(','));

console.log(`Uploading ${rows.length} images to Cloudinary cloud "${cloudName}"…\n`);

const results = [];
for (const [fileName, , , , publicId] of rows) {
  const filePath = path.join(imagesDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING local file: ${fileName}`);
    process.exit(1);
  }
  const res = await cloudinary.uploader.upload(filePath, {
    public_id: publicId,
    overwrite: true,
    resource_type: 'image',
  });
  results.push({ fileName, publicId, url: res.secure_url, bytes: res.bytes });
  console.log(`  ✓ ${publicId} → ${res.secure_url} (${(res.bytes / 1024).toFixed(0)} KB)`);
}

console.log('\nVerifying delivery URLs…');
let failed = 0;
for (const r of results) {
  const head = await fetch(r.url, { method: 'GET' });
  const type = head.headers.get('content-type') || '';
  if (head.status === 200 && type.startsWith('image/')) {
    console.log(`  ✓ 200 ${type} ${r.url}`);
  } else {
    failed++;
    console.error(`  ✗ ${head.status} ${type} ${r.url}`);
  }
}

// Write the delivery URLs back into the CSV (cloudinary_url column).
const csvOut = fs.readFileSync(csvPath, 'utf-8').split(/\r?\n/).map((line) => {
  if (!line.trim() || line.startsWith('file_name,')) return line;
  const [fileName, ...rest] = line.split(',');
  const match = results.find((r) => r.fileName === fileName);
  if (match) return [fileName, ...rest.slice(0, 4), match.url].join(',');
  return line;
}).join('\n');
fs.writeFileSync(csvPath, csvOut.endsWith('\n') ? csvOut : csvOut + '\n');
console.log(`\nCSV updated: ${csvPath}`);

if (failed > 0) {
  console.error(`${failed} delivery URL(s) failed verification — do not promote these to the catalog.`);
  process.exit(1);
}
console.log(`\nAll ${results.length} images uploaded and verified on Cloudinary.`);
