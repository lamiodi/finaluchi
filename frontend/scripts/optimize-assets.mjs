import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const imagesDir = path.resolve(publicDir, 'images');
// Brand-crest source file kept out of the deploy path (public/) — it only
// feeds the generated webp marks below.
const sourceLogo = path.resolve(__dirname, 'assets/FINALUCHIlogo.jpg');

async function optimizeLogos() {
  if (!fs.existsSync(sourceLogo)) {
    console.error('Source logo not found at:', sourceLogo);
    return;
  }

  console.log('--- Optimizing Finaluchi Logos ---');

  const outputs = [
    { path: path.join(publicDir, 'FINALUCHIlogo.webp'), width: 512, height: 512 },
    { path: path.join(publicDir, 'FINALUCHIlogo-nav.webp'), width: 256, height: 256 },
    { path: path.join(publicDir, 'FINALUCHIlogo-preloader.webp'), width: 400, height: 400 },
    { path: path.join(publicDir, 'FINALUCHIlogo-optimized.jpg'), width: 800, height: 800 },
  ];

  // Skip regeneration while every output is newer than the crest source.
  const sourceMtime = fs.statSync(sourceLogo).mtimeMs;
  if (outputs.every((o) => fs.existsSync(o.path) && fs.statSync(o.path).mtimeMs > sourceMtime)) {
    console.log('Logos up to date — skipped.');
    return;
  }

  // 1. General High-Res WebP Logo (512x512)
  const logo512Path = path.join(publicDir, 'FINALUCHIlogo.webp');
  await sharp(sourceLogo)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .webp({ quality: 90 })
    .toFile(logo512Path);
  console.log(`Generated: FINALUCHIlogo.webp (${(fs.statSync(logo512Path).size / 1024).toFixed(1)} KB)`);

  // 2. Ultra-Fast Navbar Logo (256x256 for high-DPI retina display at 24-28px)
  const navLogoPath = path.join(publicDir, 'FINALUCHIlogo-nav.webp');
  await sharp(sourceLogo)
    .resize(256, 256, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .webp({ quality: 88, effort: 6 })
    .toFile(navLogoPath);
  console.log(`Generated: FINALUCHIlogo-nav.webp (${(fs.statSync(navLogoPath).size / 1024).toFixed(1)} KB)`);

  // 3. Preloader Dark Mode Logo (White crest on transparent background)
  // Extract the grayscale intensity into alpha channel so the logo is pure white on transparent
  const preloaderLogoPath = path.join(publicDir, 'FINALUCHIlogo-preloader.webp');
  
  // To create a pure white emblem with transparency from black-on-white:
  // Invert image: black becomes white (255), white becomes black (0).
  // Then use that inverted luminance as the alpha channel of a pure white or pure champagne image.
  const { data, info } = await sharp(sourceLogo)
    .resize(400, 400, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgbaBuffer = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < data.length; i++) {
    const luminance = data[i]; // 0 is black (logo), 255 is white (background)
    const alpha = 255 - luminance; // 255 for logo, 0 for background
    
    // Pure white with calculated alpha
    const offset = i * 4;
    rgbaBuffer[offset] = 255;     // R
    rgbaBuffer[offset + 1] = 255; // G
    rgbaBuffer[offset + 2] = 255; // B
    rgbaBuffer[offset + 3] = alpha; // Alpha
  }

  await sharp(rgbaBuffer, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .webp({ quality: 95, effort: 6 })
    .toFile(preloaderLogoPath);
  console.log(`Generated: FINALUCHIlogo-preloader.webp (${(fs.statSync(preloaderLogoPath).size / 1024).toFixed(1)} KB)`);

  // 4. Also optimize the original FINALUCHIlogo.jpg down from 590 KB to a clean ~25 KB fallback
  const optimizedJpgPath = path.join(publicDir, 'FINALUCHIlogo-optimized.jpg');
  await sharp(sourceLogo)
    .resize(800, 800, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(optimizedJpgPath);
  console.log(`Generated: FINALUCHIlogo-optimized.jpg (${(fs.statSync(optimizedJpgPath).size / 1024).toFixed(1)} KB)`);
}

async function optimizeImages() {
  if (!fs.existsSync(imagesDir)) return;
  console.log('\n--- Converting public/images to WebP (full size + 480w/640w variants) ---');

  const jpegFiles = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(jpg|jpeg)$/i.test(entry.name)) jpegFiles.push(full);
    }
  };
  walk(imagesDir);

  let totalOrigBytes = 0;
  let totalWebpBytes = 0;
  const SIZES = [
    { suffix: '-480w', width: 480 },
    { suffix: '-640w', width: 640 },
    { suffix: '', width: 1920 },
  ];

  for (const origPath of jpegFiles) {
    const origStat = fs.statSync(origPath);
    totalOrigBytes += origStat.size;
    let lastBytes = 0;

    // Derived artifacts: regenerate a source only when an output is missing
    // or older than the JPEG it is generated from.
    const outPaths = SIZES.map(({ suffix }) => origPath.replace(/\.(jpg|jpeg)$/i, `${suffix}.webp`));
    const upToDate = outPaths.every(
      (outPath) => fs.existsSync(outPath) && fs.statSync(outPath).mtimeMs > origStat.mtimeMs
    );
    if (upToDate) {
      lastBytes = fs.statSync(outPaths[2]).size;
      totalWebpBytes += outPaths.reduce((sum, p) => sum + fs.statSync(p).size, 0);
      continue;
    }

    for (const { suffix, width } of SIZES) {
      const outPath = origPath.replace(/\.(jpg|jpeg)$/i, `${suffix}.webp`);
      await sharp(origPath)
        .resize(width, width, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 84, effort: 4 })
        .toFile(outPath);
      lastBytes = fs.statSync(outPath).size;
      totalWebpBytes += lastBytes;
    }

    console.log(
      `${path.relative(imagesDir, origPath)}: ${(origStat.size / 1024).toFixed(0)} KB -> ` +
      `${(lastBytes / 1024).toFixed(0)} KB WebP (+480w/640w variants)`
    );
  }

  console.log(`\nImages summary: ${(totalOrigBytes / (1024 * 1024)).toFixed(2)} MB JPEG -> ${(totalWebpBytes / (1024 * 1024)).toFixed(2)} MB WebP across ${jpegFiles.length} sources`);
}

async function main() {
  try {
    await optimizeLogos();
    await optimizeImages();
    console.log('\nAsset optimization complete!');
  } catch (err) {
    console.error('Asset optimization error:', err);
    process.exit(1);
  }
}

main();
