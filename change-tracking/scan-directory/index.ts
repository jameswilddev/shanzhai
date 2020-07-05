import * as fs from "fs";
import * as path from "path";
import { Timestamps } from "../timestamps";

export async function scanDirectory(root: string): Promise<Timestamps> {
  const timestamps: { [path: string]: number } = {};

  const recurse = async (subPath: string, prefix: string): Promise<void> => {
    for (const child of await fs.promises.readdir(subPath)) {
      const joined = path.join(subPath, child);
      const stat = await fs.promises.stat(joined);

      if (stat.isDirectory()) {
        await recurse(joined, `${prefix}${child}/`);
      } else {
        timestamps[`${prefix}${child}`] = stat.mtimeMs;
      }
    }
  };

  await recurse(root, ``);

  return timestamps;
}
