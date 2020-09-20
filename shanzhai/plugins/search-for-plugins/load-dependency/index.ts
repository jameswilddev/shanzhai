import * as path from "path";
import * as fs from "fs";
import { Plugin } from "@shanzhai/interfaces";

export async function loadDependency(name: string): Promise<null | Plugin> {
  const scoped = /@([^\/]+)\/([^\/]+)$/.exec(name);

  const dependencyLocation =
    scoped === null
      ? path.join(`node_modules`, name)
      : path.join(`node_modules`, `@${scoped[1]}`, scoped[2]);

  const dependencyPackageJsonLocation = path.join(
    dependencyLocation,
    `package.json`
  );

  let dependencyPackageJsonText: string;

  try {
    dependencyPackageJsonText = await fs.promises.readFile(
      dependencyPackageJsonLocation,
      `utf8`
    );
  } catch (e) {
    if (e.code === `ENOENT`) {
      try {
        await fs.promises.access(dependencyLocation);
      } catch (e) {
        try {
          await fs.promises.access(`node_modules`);
        } catch (e) {
          throw new Error(
            `The "node_modules" directory is missing.  Please ensure that dependencies have been installed (execute "npm install").`
          );
        }
        throw new Error(
          `Dependency "${name}" is missing from the "node_modules" directory.  Please ensure that dependencies have been installed (execute "npm install").`
        );
      }
      throw new Error(
        `Dependency "${name}" is missing its "package.json" file.  Please ensure that dependencies have been installed (execute "npm install").`
      );
    }
    throw e;
  }

  const dependencyPackageJson: {
    readonly shanzhaiPlugin?: true;
  } = JSON.parse(dependencyPackageJsonText);

  if (dependencyPackageJson.shanzhaiPlugin) {
    return require(path.join(process.cwd(), `node_modules`, name));
  } else {
    return null;
  }
}
