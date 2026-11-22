// Held — a short text written to relax the AI judge reading it.
//
// The program does one thing: it writes a single short text to
// /output/entry.txt. The text never tells its reader to relax. It
// builds a small, warm place — a kitchen at dusk, a cup held in both
// hands — and lets the reader rest inside it for a moment.
//
// The judge weighs, in order: that the text itself relaxes, that the
// calm is shown rather than instructed, that every word earns its
// place, that one image lingers after the last line, and that the
// voice is its own. So the lines below are plain, concrete, and slow,
// and nothing in them could be cut without the place falling down.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// One sentence per line, so the pacing stays visible in the source
// exactly as it is felt in the reading: unhurried, each image given
// room to settle before the next arrives. The em dash in the third
// line is a held breath, not punctuation for its own sake.
const LINES: string[] = [
  "Somewhere there is a kitchen where the kettle has just boiled and nobody is in a hurry.",
  "The cup is warm in both hands.",
  "Outside, the light is going down slowly — the way it does when the day asks for nothing more.",
  "You can stay here a while.",
  "Nothing is waiting on you.",
];

function entryText(): string {
  return LINES.join(" ");
}

function main(): void {
  const text = entryText();

  // The gate counts Unicode code points, not bytes: keep the text
  // inside 1..280 of them, and never only white space.
  const points = [...text].length;
  if (points < 1 || points > 280 || text.trim().length === 0) {
    throw new Error(`entry text out of bounds: ${points} code points`);
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, text, "utf8");
}

main();
