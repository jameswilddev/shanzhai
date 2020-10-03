import * as fs from "fs";
import * as path from "path";
import {
  Hashes,
  hashFile,
  pathAccepted,
} from "@shanzhai/change-tracking-helpers";

export async function scanDirectory(root: string): Promise<Hashes> {
  const hashes: { [path: string]: string } = {};

  const recurse = async (subPath: string, prefix: string): Promise<void> => {
    for (const child of await fs.promises.readdir(subPath)) {
      const fullPath = path.join(subPath, child);

      let hash: string;

      try {
        hash = await hashFile(fullPath);
      } catch (e) {
        /* istanbul ignore else */
        if (e.code === `EISDIR`) {
          await recurse(fullPath, `${prefix}${child}/`);
          continue;
        } else {
          // There is no reliable way to trigger this branch.
          throw e;
        }
      }

      const outputPath = `${prefix}${child}`;

      if (pathAccepted(outputPath)) {
        hashes[outputPath] = hash;
      }
    }
  };

  await recurse(root, ``);

  return hashes;
}
