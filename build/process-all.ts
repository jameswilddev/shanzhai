import * as fs from "fs";
import { processPackage } from "./process-package";
import { writeRootReadme } from "./write-root-readme";

export async function processAll(): Promise<void> {
  await processPackage([`shanzhai`]);

  console.log(`Checking namespaced packages...`);
  for (const name of await fs.promises.readdir(`@shanzhai`)) {
    await processPackage([`@shanzhai`, name]);
  }

  await writeRootReadme();
}
