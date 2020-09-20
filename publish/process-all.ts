import * as fs from "fs";
import processPackage from "./process-package";

export default async function (): Promise<void> {
  await processPackage([`shanzhai`]);

  console.log(`Publishing namespaced packages...`);
  for (const name of await fs.promises.readdir(`@shanzhai`)) {
    await processPackage([`@shanzhai`, name]);
  }
}
