import sharp from 'sharp';
import { readdir, mkdir, copyFile, rename, stat, unlink } from 'fs/promises';
import path from 'path';

const IMAGES_DIR = 'public/images';
const BACKUP_DIR = 'public/images/_originals';
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 80;

const PNG_TO_JPEG = ['sandwich.png', 'framboise.png'];

async function getSize(filePath) {
  const s = await stat(filePath);
  return s.size;
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function optimize() {
  await mkdir(BACKUP_DIR, { recursive: true });

  const files = await readdir(IMAGES_DIR);
  let totalBefore = 0;
  let totalAfter = 0;

  // Fix filename with trailing space
  const badName = files.find(f => f.includes('tourte_de_meule '));
  if (badName) {
    const oldPath = path.join(IMAGES_DIR, badName);
    const newPath = path.join(IMAGES_DIR, badName.replace('tourte_de_meule ', 'tourte_de_meule'));
    await rename(oldPath, newPath);
    console.log(`Renamed: "${badName}" → "${badName.replace('tourte_de_meule ', 'tourte_de_meule')}"`);
  }

  const updatedFiles = await readdir(IMAGES_DIR);

  for (const file of updatedFiles) {
    if (file === '_originals') continue;
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const inputPath = path.join(IMAGES_DIR, file);
    const backupPath = path.join(BACKUP_DIR, file);
    const sizeBefore = await getSize(inputPath);
    totalBefore += sizeBefore;

    await copyFile(inputPath, backupPath);

    const img = sharp(inputPath);
    const metadata = await img.metadata();

    if (PNG_TO_JPEG.includes(file)) {
      const jpegName = file.replace('.png', '.jpg');
      const outputPath = path.join(IMAGES_DIR, jpegName);

      let pipeline = sharp(inputPath);
      if (metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
      }
      await pipeline
        .jpeg({ quality: JPEG_QUALITY, progressive: true })
        .toFile(outputPath);

      await unlink(inputPath);

      const sizeAfter = await getSize(outputPath);
      totalAfter += sizeAfter;
      console.log(`${file} → ${jpegName}: ${formatSize(sizeBefore)} → ${formatSize(sizeAfter)} (${Math.round((1 - sizeAfter / sizeBefore) * 100)}% smaller)`);
    } else if (ext === '.png') {
      const tmpPath = inputPath + '.tmp';
      let pipeline = sharp(inputPath);
      if (metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
      }
      await pipeline
        .png({ quality: 80, compressionLevel: 9, effort: 10 })
        .toFile(tmpPath);

      await unlink(inputPath);
      await rename(tmpPath, inputPath);

      const sizeAfter = await getSize(inputPath);
      totalAfter += sizeAfter;
      console.log(`${file}: ${formatSize(sizeBefore)} → ${formatSize(sizeAfter)} (${Math.round((1 - sizeAfter / sizeBefore) * 100)}% smaller)`);
    } else {
      const tmpPath = inputPath + '.tmp';
      let pipeline = sharp(inputPath);
      if (metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
      }
      await pipeline
        .jpeg({ quality: JPEG_QUALITY, progressive: true })
        .toFile(tmpPath);

      await unlink(inputPath);
      await rename(tmpPath, inputPath);

      const sizeAfter = await getSize(inputPath);
      totalAfter += sizeAfter;
      console.log(`${file}: ${formatSize(sizeBefore)} → ${formatSize(sizeAfter)} (${Math.round((1 - sizeAfter / sizeBefore) * 100)}% smaller)`);
    }
  }

  console.log(`\nTotal: ${formatSize(totalBefore)} → ${formatSize(totalAfter)} (${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller)`);
}

optimize().catch(console.error);
