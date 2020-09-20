import * as fs from "fs";
import * as path from "path";
import { runCommandLine } from "../build/run-command-line";

export default async function (name: ReadonlyArray<string>): Promise<void> {
  console.log(`Processing package "${name.join(`/`)}"...`);

  console.log(`Checking for latest published version...`);
  let publishedVersion;
  try {
    publishedVersion = (
      await runCommandLine(`npm view ${name.join(`/`)} version`, process.cwd())
    ).trim();
  } catch (e) {
    if (!e.message.includes(` is not in the npm registry.`)) {
      throw e;
    }
    publishedVersion = `none`;
  }

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
