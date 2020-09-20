import * as fs from "fs";
import { processPackage } from "./process-package";
import { writeRootReadme } from "./write-root-readme";

export async function processAll(): Promise<void> {
  await Promise.all([
    processPackage([`shanzhai`]),
    ...(await fs.promises.readdir(`@shanzhai`)).map((name) =>
      processPackage([`@shanzhai`, name])
    ),
  ]);

  await writeRootReadme();
}
