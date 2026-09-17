import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const imagesDir = path.resolve(publicDir, 'images');

async function optimizeLogos() {
  const sourceLogo = path.join(publicDir, 'FINALUCHIlogo.jpg');
  if (!fs.existsSync(sourceLogo)) {
    console.error('Source logo not found at:', sourceLogo);
    return;
  }

  console.log('--- Optimizing Finaluchi Logos ---');

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
  console.log('\n--- Converting public/images to WebP ---');

  const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));
  let totalOrigBytes = 0;
  let totalWebpBytes = 0;

  for (const file of files) {
    const origPath = path.join(imagesDir, file);
    const webpName = file.replace(/\.(jpg|jpeg)$/i, '.webp');
    const webpPath = path.join(imagesDir, webpName);

    const origStat = fs.statSync(origPath);
    totalOrigBytes += origStat.size;

    // Convert to webp with high quality and max 1920 width
    await sharp(origPath)
      .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 84, effort: 4 })
      .toFile(webpPath);

    const webpStat = fs.statSync(webpPath);
    totalWebpBytes += webpStat.size;
    console.log(`Converted ${file}: ${(origStat.size / 1024).toFixed(0)} KB -> ${(webpStat.size / 1024).toFixed(0)} KB WebP`);
  }

  console.log(`\nImages summary: ${(totalOrigBytes / (1024 * 1024)).toFixed(2)} MB -> ${(totalWebpBytes / (1024 * 1024)).toFixed(2)} MB WebP (${((1 - totalWebpBytes / totalOrigBytes) * 100).toFixed(1)}% reduction)`);
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
