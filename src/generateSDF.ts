import fs from 'fs-extra'
import chalk from 'chalk';
import path from 'path';
import { genFont, setGeneratePaths } from './genFont.js';
import { adjustFont } from './adjustFont.js';

const font_exts = ['.ttf', '.otf', '.woff', '.woff2'];

export async function generateSDF(inputFilePath:string, outputDirPath:string, type:'ssdf' | 'msdf'){
  console.log(chalk.green.bold('Lightning 3 SDF Font Generator'));

  // Check inputFilePath exists
  if (!fs.existsSync(inputFilePath)) {
    console.log(chalk.red.bold(`${inputFilePath} path not found. Exiting...`))
  }
  
  fs.ensureDirSync(outputDirPath);

  setGeneratePaths(path.dirname(inputFilePath), outputDirPath)

  if (font_exts.includes(path.extname(inputFilePath))) {
    let font = await genFont(path.basename(inputFilePath), type)
    if (font) await adjustFont(font)
  }
}