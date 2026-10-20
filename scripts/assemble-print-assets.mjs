import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const manifests = ['fantasy-battle.json', 'word-race.json'].map(name => JSON.parse(fs.readFileSync(path.join(root, `print-assets/${name}`), 'utf8')));
const files = manifests.flatMap(manifest => manifest.files);
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
for (const file of files) {
  const output = path.join(root, file.output);
  if (fs.existsSync(output) && hash(fs.readFileSync(output)) === file.sha256) continue;
  fs.mkdirSync(path.dirname(output), {recursive: true});
  const temporary = output + '.assembling';
  const fd = fs.openSync(temporary, 'w');
  const total = crypto.createHash('sha256');
  let size = 0;
  try {
    for (const part of file.parts) {
      const bytes = fs.readFileSync(path.join(root, part.path));
      if (bytes.length !== part.size || hash(bytes) !== part.sha256) throw new Error(`Invalid print asset part: ${part.path}`);
      if (fs.writeSync(fd, bytes) !== bytes.length) throw new Error(`Incomplete write: ${file.output}`);
      total.update(bytes);
      size += bytes.length;
    }
  } finally {
    fs.closeSync(fd);
  }
  if (size !== file.size || total.digest('hex') !== file.sha256) {
    fs.rmSync(temporary, {force: true});
    throw new Error(`Invalid printable PDF: ${file.output}`);
  }
  fs.renameSync(temporary, output);
  console.log(`Prepared ${file.output}`);
}
