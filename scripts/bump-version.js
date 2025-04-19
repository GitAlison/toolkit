import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File paths
const pkgPath = path.resolve(__dirname, '../package.json');
const manifestPath = path.resolve(__dirname, '../public/manifest.json');

// Read files
const pkgRaw = await fs.promises.readFile(pkgPath, 'utf-8');
const pkg = JSON.parse(pkgRaw);

const currentBranch = process.env.BRANCH_NAME || '';

if (currentBranch !== 'main') {
  console.log(`✅ Skipping version bump — current branch is: ${currentBranch}`);
  process.exit(0);
}

const lastCommitMessage = execSync('git log -1 --pretty=%B').toString().trim();


// Semantic version bump logic
function bumpVersion(version, type) {
  let [major, minor, patch] = version.split('.').map(Number);

  switch (type) {
    case 'major':
      major += 1;
      minor = 0;
      patch = 0;
      break;
    case 'minor':
      minor += 1;
      patch = 0;
      break;
    case 'patch':
    default:
      patch += 1;
  }

  return `${major}.${minor}.${patch}`;
}

// Determine bump type
let bumpType = 'patch';

if (/BREAKING_CHANGE/.test(lastCommitMessage)) {
  bumpType = 'major';
} else if (/^feat(\(.+\))?:/.test(lastCommitMessage)) {
  bumpType = 'minor';
} else if (/^fix(\(.+\))?:/.test(lastCommitMessage)) {
  bumpType = 'patch';
}

console.log(`🔍 Bump type detected from commit message: ${bumpType}`);

const newVersion = bumpVersion(pkg.version, bumpType);

// Update package.json
pkg.version = newVersion;
await fs.promises.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`📦 package.json updated to version: ${pkg.version}`);

// Update manifest.json
try {
  const manifestRaw = await fs.promises.readFile(manifestPath, 'utf-8');
  const manifest = JSON.parse(manifestRaw);
  manifest.version = newVersion;
  await fs.promises.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`🗂️ manifest.json updated to version: ${newVersion}`);
} catch (err) {
  console.warn(`⚠️ Could not update public/manifest.json: ${err.message}`);
}
