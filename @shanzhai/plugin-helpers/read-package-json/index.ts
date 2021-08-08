import * as fs from "fs";

export async function readPackageJson(): Promise<{
  readonly dependencies: ReadonlyArray<string>;
  readonly root: null | ReadonlyArray<string>;
}> {
  let packageJsonText: string;

  try {
    packageJsonText = await fs.promises.readFile(`package.json`, `utf8`);
  } catch (e) {
    if (e.code === `ENOENT`) {
      throw new Error(
        `Failed to find the "package.json" file.  Please ensure that the current working directory is the root of the project.`
      );
    }
    throw e;
  }

  const packageJson: {
    readonly dependencies?: { readonly [key: string]: string };
    readonly devDependencies?: { readonly [key: string]: string };
    readonly shanzhaiPlugin?: ReadonlyArray<string>;
  } = JSON.parse(packageJsonText);

  const dependencies: string[] = [];

  function appendFrom(packageDependencies?: {
    readonly [key: string]: string;
  }): void {
    if (!packageDependencies) {
      return;
    }

    for (const key in packageDependencies) {
      if (!dependencies.includes(key)) {
        dependencies.push(key);
      }
    }
  }

  appendFrom(packageJson.dependencies);
  appendFrom(packageJson.devDependencies);

  dependencies.sort();

  return { dependencies, root: packageJson.shanzhaiPlugin ?? null };
}
