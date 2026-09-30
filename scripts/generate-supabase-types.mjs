/**
 * Regenerates src/supabase/supabase.types.ts from the live schema.
 *
 *   yarn generate-supabase-types
 *
 * The obvious form of this — `supabase gen types ... > the-file` — is a trap on
 * Windows: the shell truncates the target *before* the command runs, so any
 * failure (an expired login, a network blip) leaves the types file at 0 bytes
 * and the app stops compiling. That happened once; hence this script.
 *
 * Here the output is held in memory and the file is only written after it looks
 * like a real schema, so a failed run leaves the existing file untouched.
 *
 * Needs the Supabase CLI to be authenticated: `npx supabase login`, or a
 * SUPABASE_ACCESS_TOKEN in the environment.
 */
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const PROJECT_ID = "ibmntluopsbktoqjaubs";
const TARGET = "src/supabase/supabase.types.ts";

let output;
try {
  output = execFileSync(
    "npx",
    [
      "supabase",
      "gen",
      "types",
      "typescript",
      "--project-id",
      PROJECT_ID,
      "--schema",
      "public",
    ],
    {
      encoding: "utf8",
      // stderr passes through so the CLI's own message (e.g. "Access token not
      // provided") is what the reader sees, rather than a wrapper's guess.
      stdio: ["ignore", "pipe", "inherit"],
      // npx resolves through a shell on Windows.
      shell: process.platform === "win32",
    },
  );
} catch {
  console.error(`\n${TARGET} left unchanged.\n`);
  process.exit(1);
}

// A guard against writing a truncated or unexpected response over a good file.
// The CLI prints the schema to stdout, so anything lacking this isn't one.
if (!output.includes("export type Database")) {
  console.error(
    `\nUnexpected output from the Supabase CLI (${output.length} bytes, no Database type).\n${TARGET} left unchanged.\n`,
  );
  process.exit(1);
}

writeFileSync(TARGET, output);
console.log(`Wrote ${TARGET} (${output.length} bytes).`);
console.log(
  "Run `yarn format` if the diff looks larger than the schema change.",
);
