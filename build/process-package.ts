import { writeReadme } from "./write-readme";
import { readPackageJson } from "./read-package-json";
import { copyLicense } from "./copy-license";
import { writePackageJson } from "./write-package-json";
import { allPackages } from "./all-packages";
import { installDependencies } from "./install-dependencies";

export async function processPackage(
  name: ReadonlyArray<string>
): Promise<void> {
  console.log(`Processing package "${name.join(`/`)}"...`);
  const originalPackageJson = await readPackageJson(name);
  allPackages.push({
    name: name.join(`/`),
    version: originalPackageJson.version,
    description: originalPackageJson.description,
  });
  await writeReadme(
    name,
    originalPackageJson.description,
    originalPackageJson.dependencies
  );
  await copyLicense(name);
  await writePackageJson(name, originalPackageJson);
  await installDependencies(name);
}
