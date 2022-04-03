import * as fs from "fs";
import * as path from "path";
import { getPublishedVersionOfPackage } from "../build/get-published-version-of-package";
import { runCommandLine } from "../build/run-command-line";

export default async function (name: ReadonlyArray<string>): Promise<void> {
  console.log(`Processing package "${name.join(`/`)}"...`);

  console.log(`Checking for latest published version...`);
  const publishedVersion = await getPublishedVersionOfPackage(name);

  console.log(`Checking for latest built version...`);
  const pathToPackageJson = path.join(...[...name, `package.json`]);
  const packageJsonText = await fs.promises.readFile(pathToPackageJson, `utf8`);
  const packageJson: { readonly version: string } = JSON.parse(packageJsonText);

  if (publishedVersion === packageJson.version) {
    console.log(`Versions match; nothing to do.`);
    return;
  }

  console.log(
    `Latest published version "${publishedVersion}" does not match latest built version "${packageJson.version}"; publishing...`
  );
  await runCommandLine(`npm publish`, path.join(...name));
}
