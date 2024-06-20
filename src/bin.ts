#!/usr/bin/env node

import arg from 'arg';
import fs from 'fs-extra';
import {execa} from 'execa';
import path from 'path';

const args = arg({
  '--name': String,
  '--template': String,
});

const projectName = args['--name'] ?? 'my-app';

const template = args['--template'] ?? 'basic';

if (fs.existsSync(projectName)) {
  throw new Error(`This project already exists '${projectName}'`);
} else {
  fs.mkdirSync(projectName);
}

await copyAllFiles(`templates/${template}`, projectName);

const pathOfPackageJson = `${projectName}/package.json`;

const packageJsonString = fs.readFileSync(pathOfPackageJson, {encoding: 'utf8'});

const packageJson = JSON.parse(packageJsonString);

fs.writeFileSync(pathOfPackageJson, JSON.stringify({...packageJson, name: projectName}, null, 2));

const {stdout} = await execa('npm', ['install'], {cwd: projectName});

console.log(stdout);

async function copyAllFiles(sourceDir: string, targetDir: string) {
  try {
    // Ensure the target directory exists
    await fs.ensureDir(targetDir);

    // Read all items in the source directory
    const items = await fs.readdir(sourceDir);

    // Iterate over all items and copy them to the target directory
    for (const item of items) {
      const sourcePath = path.join(sourceDir, item);
      const targetPath = path.join(targetDir, item);

      // Copy the item (file or directory)
      await fs.copy(sourcePath, targetPath);
    }
  } catch (err) {
    console.error('Error copying files:', err);
  }
}
