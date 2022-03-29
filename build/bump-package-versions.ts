import * as fs from "fs";
import * as path from "path";
import * as semver from "semver";
import { getAllPackages } from "./get-all-packages";
import { getPublishedVersionOfPackage } from "./get-published-version-of-package";
import { packageHasUnpublishedChanges } from "./package-has-unpublished-changes";

(async () => {
  console.log(`Bumping package versions...`);
  const packages = await getAllPackages();

  await Promise.all(
    packages.map(async (pkg) => {
      if (
        (await packageHasUnpublishedChanges(pkg.name)) &&
        pkg.json.version === (await getPublishedVersionOfPackage(pkg.name))
      ) {
        const newPackageJsonPath = path.join(...[...pkg.name, `package.json`]);
        const newPackageJson = {
          ...pkg.json,
          version: semver.inc(pkg.json.version, `patch`),
        };
        const newPackageJsonText = `${JSON.stringify(
          newPackageJson,
          null,
          2
        )}\n`;
        await fs.promises.writeFile(newPackageJsonPath, newPackageJsonText);
      }
    })
  );
})()
  .then(() => {
    console.log(`Done`);
    process.exit(0);
  })
  .catch((error) => {
    console.error(`Failed.`);
    console.error(error);
    process.exit(1);
  });
