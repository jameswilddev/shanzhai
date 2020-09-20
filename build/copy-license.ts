import * as fs from "fs";
import * as path from "path";

export async function copyLicense(name: ReadonlyArray<string>): Promise<void> {
  console.log(`${name.join(`/`)} - Copying license...`);
  await fs.promises.copyFile(`license`, path.join(...[...name, `license`]));
}
