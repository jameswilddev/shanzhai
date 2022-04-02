import * as fs from "fs";
import processPackage from "./process-package";

export default async function (): Promise<void> {
  console.log(`Publishing namespaced packages...`);
  await Promise.all(
    (
      await fs.promises.readdir(`@shanzhai`)
    ).map((name) => processPackage([`@shanzhai`, name]))
  );
}
