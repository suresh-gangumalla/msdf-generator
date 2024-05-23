
import { adjustFont } from './adjustFont.js';
import { genFont, setGeneratePaths } from './genFont.js';
import fs from 'fs-extra';
import chalk from 'chalk';

const fontSrcDir = 'font-src';
const fontDstDir = 'font-dst';
const font_exts = ['.ttf', '.otf', '.woff', '.woff2'];

console.log(chalk.green.bold('Lightning 3 SDF Font Generator'));

// Check if src directory exists
if (!fs.existsSync(fontSrcDir)) {
  console.log(chalk.red.bold('`font-src` directory not found. Exiting...'));
  process.exit(1);
}

fs.ensureDirSync(fontDstDir);


export async function generateFonts() {
  const files = fs.readdirSync(fontSrcDir);

  let fontsFound = 0;
  for (const file of files) {
    for (const ext of font_exts) {
      if (file.endsWith(ext)) {
        fontsFound++;
        let font = await genFont(file, 'msdf');
        if (font) await adjustFont(font);

        font = await genFont(file, 'ssdf')
        if (font) await adjustFont(font);
      }
    }
  }
  if (fontsFound === 0) {
    console.log(chalk.red.bold('No font files found in `font-src` directory. Exiting...'));
    process.exit(1);
  }
}

(async () => {
  setGeneratePaths(fontSrcDir, fontDstDir);
  await generateFonts();
})().catch((err) => {
  console.log(err);
});