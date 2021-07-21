import * as fs from "fs";
import * as path from "path";
import { pathAccepted } from "@shanzhai/change-tracking-helpers";

export async function scanDirectory(
  root: string
): Promise<ReadonlyArray<string>> {
  const output: string[] = [];

  const recurse = async (subPath: string, prefix: string): Promise<void> => {
    for (const child of await fs.promises.readdir(subPath)) {
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

  await recurse(root, ``);

  return output;
}
