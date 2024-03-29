#!/usr/bin/env node
import { searchForPlugins } from "@shanzhai/plugin-helpers";
import { plan } from "@shanzhai/planning-helpers";
import { execute } from "@shanzhai/execution-helpers";
import { scanDirectory } from "./scan-directory";

(async () => {
  console.error(`Searching for plugins...`);
  const plugins = await searchForPlugins();

  console.error(`Scanning for files...`);
  const files = await scanDirectory();

  console.error(`Planning...`);
  const step = await plan(plugins, true, {
    added: files,
    changed: [],
    deleted: [],
    unchanged: [],
  });

  if (step.unmatchedAddedFiles.length > 0) {
    console.error(
      `\nThe following files were found to not match any installed plugins:\n\n${step.unmatchedAddedFiles
        .map((file) => ` - ${JSON.stringify(file)}`)
        .join(`\n`)}`
    );

    process.exit(1);
  } else {
    process.exit((await execute(step.step, process.stderr)) ? 0 : 1);
  }
})();
