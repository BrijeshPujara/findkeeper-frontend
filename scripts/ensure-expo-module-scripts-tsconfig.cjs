const fs = require('node:fs');
const path = require('node:path');

const baseDir = path.join(process.cwd(), 'node_modules', 'expo-module-scripts');
const withExtension = path.join(baseDir, 'tsconfig.base.json');
const withoutExtension = path.join(baseDir, 'tsconfig.base');

if (!fs.existsSync(baseDir) || !fs.existsSync(withExtension)) {
  process.exit(0);
}

if (!fs.existsSync(withoutExtension)) {
  fs.copyFileSync(withExtension, withoutExtension);
  process.stdout.write('Created expo-module-scripts/tsconfig.base compatibility file.\n');
}
