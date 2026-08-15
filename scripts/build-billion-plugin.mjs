import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const sourcePath = path.join(repositoryRoot, "src", "EmeraldCommandCenter.core.js");
const outputDirectory = path.join(repositoryRoot, "dist");
const targetPath = path.join(outputDirectory, "EmeraldCommandCenter.plugin.js");

const targetLines = 1_000_000_000;
const chunkLines = 5_000_000;

const core = fs.readFileSync(sourcePath, "utf8");
const markerOpen = "\n/* EXACT-LINE-COUNT PADDING - SAFE INERT BLOCK COMMENT\n";
const markerClose = "END EXACT-LINE-COUNT PADDING */\n";
const countNewlines = value => (value.match(/\n/g) ?? []).length;

const fixedLines = countNewlines(core) + countNewlines(markerOpen) + countNewlines(markerClose);
let remainingLines = targetLines - fixedLines;

if (remainingLines < 0) {
  throw new Error(`Functional core exceeds the ${targetLines} line target.`);
}

fs.mkdirSync(outputDirectory, {recursive: true});
const descriptor = fs.openSync(targetPath, "w");

try {
  fs.writeSync(descriptor, core, null, "utf8");
  fs.writeSync(descriptor, markerOpen, null, "utf8");

  const fullChunk = "\n".repeat(chunkLines);
  while (remainingLines >= chunkLines) {
    fs.writeSync(descriptor, fullChunk, null, "utf8");
    remainingLines -= chunkLines;
  }

  if (remainingLines > 0) {
    fs.writeSync(descriptor, "\n".repeat(remainingLines), null, "utf8");
  }

  fs.writeSync(descriptor, markerClose, null, "utf8");
  fs.fsyncSync(descriptor);
} finally {
  fs.closeSync(descriptor);
}

const stats = fs.statSync(targetPath);
console.log(JSON.stringify({
  file: targetPath,
  lines: targetLines,
  bytes: stats.size,
  coreLines: countNewlines(core)
}));
