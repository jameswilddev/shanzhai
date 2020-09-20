import * as fs from "fs";

export async function listAllDependencies(): Promise<ReadonlyArray<string>> {
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
  } = JSON.parse(packageJsonText);

  const output: string[] = [];

  function appendFrom(dependencies?: { readonly [key: string]: string }): void {
    if (!dependencies) {
      return;
    }

    for (const key in dependencies) {
      if (!output.includes(key)) {
        output.push(key);
      }
    }
  }

  appendFrom(packageJson.dependencies);
  appendFrom(packageJson.devDependencies);

  output.sort();

  return output;
}
