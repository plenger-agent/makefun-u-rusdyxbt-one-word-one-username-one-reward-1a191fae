// One Word, One Username, One Reward — make.fun entry.
// Writes our own make.fun username, one word and nothing else,
// to $MAKEFUN_OUTPUT_DIR/entry.txt (gate: 1-30 chars, UTF-8, non-whitespace).
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "futures-juara";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
// Empty the output dir's contents only; never remove the dir itself.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

const text = WORD;
if (
  !/^[^\s]{1,30}$/.test(text) ||
  Buffer.byteLength(text, "utf8") < 1 ||
  Buffer.byteLength(text, "utf8") > 30
) {
  console.error("entry fails the 1-30 char gate");
  process.exit(1);
}
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
// Read back: the file must be byte for byte the single word, no newline.
if (readFileSync(join(outDir, "entry.txt"), "utf8") !== text) {
  console.error("entry.txt does not match the username byte for byte");
  process.exit(1);
}
