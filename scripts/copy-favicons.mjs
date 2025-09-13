// scripts/copy-favicons.mjs
// Copie le favicon depuis public/images/ vers la racine public/
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcPng = path.join(root, 'public', 'images', 'favicon.png');
const dstPng = path.join(root, 'public', 'favicon.png');
const dstApple = path.join(root, 'public', 'apple-touch-icon.png');
const dstIco = path.join(root, 'public', 'favicon.ico');

function copyIfExists(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`⚠️  Fichier source introuvable: ${src}`);
    return false;
  }
  fs.copyFileSync(src, dest);
  console.log(`✅ Copié: ${src} → ${dest}`);
  return true;
}

// Copie PNG racine et apple-touch-icon
const ok = copyIfExists(srcPng, dstPng);
if (ok) copyIfExists(srcPng, dstApple);

// Duplique aussi en .ico (basé sur PNG). Suffisant pour la majorité des navigateurs modernes
// Pour un .ico "parfait", fournir un vrai fichier ICO multi-tailles.
if (ok) copyIfExists(srcPng, dstIco);

