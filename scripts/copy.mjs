import fs from 'node:fs';
import path from 'node:path';

const srcFile = path.join(import.meta.dirname, '..', 'src', 'jquery.wheel.js');
const distDir = path.join(import.meta.dirname, '..', 'dist');
const distFile = path.join(distDir, 'jquery.wheel.js');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Copy file
fs.copyFileSync(srcFile, distFile);

console.log(`Copied ${srcFile} to ${distFile}`);

