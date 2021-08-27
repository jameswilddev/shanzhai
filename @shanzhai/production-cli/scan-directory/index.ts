import * as fs from "fs";
import * as path from "path";
import { pathAccepted } from "@shanzhai/change-tracking-helpers";

function isError(error: unknown): error is NodeJS.ErrnoException {
  return (
    Object.prototype.hasOwnProperty.call(error, `code`) &&
    typeof (error as { readonly code: unknown }).code === `string` &&
    error instanceof Error
  );
}

export async function scanDirectory(): Promise<ReadonlyArray<string>> {
  const output: string[] = [];

  const recurse = async (subPath: string, prefix: string): Promise<void> => {
    let names: ReadonlyArray<string>;

    try {
      names = await fs.promises.readdir(subPath);
    } catch (e) {
      // We have no way to reliably not hit these conditions in tests.
      /* istanbul ignore else */
      if (subPath === `src`) {
        /* istanbul ignore else */
        if (isError(e)) {
          switch (e.code) {
            case `ENOENT`:
              throw new Error(
                `The "src" directory could not be found in the current working directory.  Please ensure that you are executing "shanzhai-production-cli" from your project's root directory.`
              );

            case `ENOTDIR`:
              throw new Error(
                `The "src" path in the current working directory refers to a file, not a directory.  Please ensure that you are executing "shanzhai-production-cli" from your project's root directory.`
              );

            // We have no way to reliably hit these conditions in tests.
            /* istanbul ignore next*/
            default:
              /* istanbul ignore next*/
              throw e;
          }
        } else {
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
