import { writeReadme } from "./write-readme";
import { readPackageJson } from "./read-package-json";
import { copyLicense } from "./copy-license";
import { writePackageJson } from "./write-package-json";
import { allPackages } from "./all-packages";
import { installDependencies } from "./install-dependencies";

export async function processPackage(
  name: ReadonlyArray<string>
): Promise<void> {
  const originalPackageJson = await readPackageJson(name);
  allPackages.push({
    name: name.join(`/`),
    version: originalPackageJson.version,
    description: originalPackageJson.description,
  });
  await Promise.all([
    writeReadme(
      name,
      originalPackageJson.description,
      originalPackageJson.dependencies,
      originalPackageJson.peerDependencies
    ),
    copyLicense(name),
    (async () => {
      await writePackageJson(name, originalPackageJson);
      await installDependencies(name);
    })(),
  ]);
}
