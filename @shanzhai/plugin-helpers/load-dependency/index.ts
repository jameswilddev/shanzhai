import * as path from "path";
import * as fs from "fs";
import { Plugin, Trigger } from "@shanzhai/interfaces";

function isError(error: unknown): error is NodeJS.ErrnoException {
  return (
    Object.prototype.hasOwnProperty.call(error, `code`) &&
    typeof (error as { readonly code: unknown }).code === `string` &&
    error instanceof Error
  );
}

export async function loadDependency(
  name: string
): Promise<null | Plugin<{ readonly [name: string]: Trigger }>> {
  const scoped = /@([^/]+)\/([^/]+)$/.exec(name);

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
    if (isError(e) && e.code === `ENOENT`) {
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
    readonly shanzhaiPlugin?: ReadonlyArray<string>;
  } = JSON.parse(dependencyPackageJsonText);

  if (dependencyPackageJson.shanzhaiPlugin) {
    return require(path.join(
      process.cwd(),
      `node_modules`,
      name,
      ...dependencyPackageJson.shanzhaiPlugin
    ));
  } else {
    return null;
  }
}
