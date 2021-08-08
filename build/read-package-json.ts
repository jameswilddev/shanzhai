import * as fs from "fs";
import * as path from "path";

export async function readPackageJson(name: ReadonlyArray<string>): Promise<{
  readonly description: string;
  readonly version: string;
  readonly dependencies?: { readonly [name: string]: string };
  readonly peerDependencies?: { readonly [name: string]: string };
  readonly devDependencies?: { readonly [name: string]: string };
  readonly bin?: string;
  readonly scripts?: { readonly [name: string]: string };
  readonly shanzhaiPlugin?: ReadonlyArray<string>;
}> {
  console.log(`${name.join(`/`)} - Reading package.json...`);
  const packageJsonPath = path.join(...[...name, `package.json`]);
  const packageJson = await fs.promises.readFile(packageJsonPath, `utf8`);
  return JSON.parse(packageJson);
}
