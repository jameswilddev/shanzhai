import * as fs from "fs";
import * as path from "path";
import { pathAccepted } from "@shanzhai/change-tracking-helpers";

export async function scanDirectory(): Promise<ReadonlyArray<string>> {
  const output: string[] = [];

  const recurse = async (subPath: string, prefix: string): Promise<void> => {
    let names: ReadonlyArray<string>;

    try {
      names = await fs.promises.readdir(subPath);
    } catch (e) {
      if (subPath === `src`) {
        switch (e.code) {
          case `ENOENT`:
            throw new Error(
              `The "src" directory could not be found in the current working directory.  Please ensure that you are executing "shanzhai-production-cli" from your project's root directory.`
            );

          case `ENOTDIR`:
            throw new Error(
              `The "src" path in the current working directory refers to a file, not a directory.  Please ensure that you are executing "shanzhai-production-cli" from your project's root directory.`
            );

          default:
            throw e;
        }
      } else {
        throw e;
      }
    }

    for (const child of names) {
      const fullPath = path.join(subPath, child);

      const stat = await fs.promises.stat(fullPath);

      const outputPath = `${prefix}${child}`;

      if (stat.isDirectory()) {
        await recurse(fullPath, `${prefix}${child}/`);
        continue;
      } else if (stat.isFile() && pathAccepted(outputPath)) {
        output.push(outputPath);
      }
    }
  };

  await recurse(`src`, ``);

  return output;
}
