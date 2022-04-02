import * as fs from "fs";
import * as path from "path";
import { getAllPackages } from "./get-all-packages";

(async () => {
  console.log(`Harmonizing package versions...`);
  const packages = await getAllPackages();

  for (const pkg of packages) {
    let newPkg = pkg;

    for (const dependencySetKey of [
      `dependencies`,
      `devDependencies`,
      `peerDependencies`,
    ] as ReadonlyArray<
      `dependencies` | `devDependencies` | `peerDependencies`
    >) {
      let dependencySet = pkg.json[dependencySetKey];

      if (dependencySet !== undefined) {
        for (const key in dependencySet) {
          for (const otherPkg of packages) {
            if (
              otherPkg.name.join(`/`) === key &&
              otherPkg.json.version !== dependencySet[key]
            ) {
              console.log(
                `Upgrading ${pkg.name.join(`/`)}'s version of ${key} from ${
                  dependencySet[key]
                } to ${otherPkg.json.version}...`
              );

              dependencySet = {
                ...dependencySet,
                [key]: otherPkg.json.version,
              };

              newPkg = {
                ...newPkg,
                json: {
                  ...newPkg.json,
                  [dependencySetKey]: dependencySet,
                },
              };
            }
          }
        }
      }
    }

    if (newPkg !== pkg) {
      const newPackageJsonPath = path.join(...[...pkg.name, `package.json`]);
      const newPackageJsonText = `${JSON.stringify(newPkg.json, null, 2)}\n`;
      await fs.promises.writeFile(newPackageJsonPath, newPackageJsonText);
    }
  }
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
