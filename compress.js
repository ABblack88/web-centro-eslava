const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = path.join(__dirname, 'img');

async function processDirectory() {
  const files = fs.readdirSync(imgDir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const filePath = path.join(imgDir, file);
    const stats = fs.statSync(filePath);
    
    // Delete .CR3 files
    if (ext === '.cr3') {
      console.log(`Deleting ${file} as it is unsupported...`);
      fs.unlinkSync(filePath);
      continue;
    }

    // Compress images larger than 1MB
    if (stats.size > 1024 * 1024 && (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.webp')) {
      console.log(`Compressing ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);
      const tempPath = filePath + '.tmp';
      try {
        await sharp(filePath)
          .resize({ width: 1920, withoutEnlargement: true }) // max width 1920px
          .webp({ quality: 80, effort: 6 }) // Convert/save keeping extensions but highly compressed or just compress original format?
          .toFile(tempPath);
        
        // Let's keep the same format instead of converting to webp to avoid breaking HTML links
        // We will just compress based on extension
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

// Let's rewrite the script to save in original format but compressed
async function processDirectoryBetter() {
  const files = fs.readdirSync(imgDir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const filePath = path.join(imgDir, file);
    const stats = fs.statSync(filePath);
    
    if (ext === '.cr3' || ext === '.hif') {
      console.log(`Deleting unsupported raw file: ${file}`);
      fs.unlinkSync(filePath);
      continue;
    }

    if (stats.size > 1024 * 1024 && ['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
      console.log(`Compressing ${file}...`);
      const tempPath = filePath + '.tmp';
      try {
        let image = sharp(filePath).rotate().resize({ width: 1920, withoutEnlargement: true });
        
        if (ext === '.png') {
            image = image.png({ quality: 80, compressionLevel: 9 });
        } else if (ext === '.jpg' || ext === '.jpeg') {
            image = image.jpeg({ quality: 80, mozjpeg: true });
        } else if (ext === '.webp') {
            image = image.webp({ quality: 80 });
        }
        
        await image.toFile(tempPath);
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        
        const newStats = fs.statSync(filePath);
        console.log(`Successfully compressed ${file}: ${(stats.size/1024/1024).toFixed(2)}MB -> ${(newStats.size/1024/1024).toFixed(2)}MB`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

processDirectoryBetter();
