import * as fs from "fs";
import { readPackageJson } from "./read-package-json";

export async function getAllPackages(): Promise<
  ReadonlyArray<{
    readonly name: ReadonlyArray<string>;
    readonly json: {
      readonly description: string;
      readonly version: string;
      readonly dependencies?: { readonly [name: string]: string };
      readonly peerDependencies?: { readonly [name: string]: string };
      readonly devDependencies?: { readonly [name: string]: string };
      readonly bin?: string;
      readonly scripts?: { readonly [name: string]: string };
      readonly shanzhaiPlugin?: ReadonlyArray<string>;
    };
  }>
> {
  const output: {
    readonly name: ReadonlyArray<string>;
    readonly json: {
      readonly description: string;
      readonly version: string;
      readonly dependencies?: { readonly [name: string]: string };
      readonly peerDependencies?: { readonly [name: string]: string };
      readonly devDependencies?: { readonly [name: string]: string };
      readonly bin?: string;
      readonly scripts?: { readonly [name: string]: string };
      readonly shanzhaiPlugin?: ReadonlyArray<string>;
    };
  }[] = [];

  for (const name of [
    [`shanzhai`],
    ...(await fs.promises.readdir(`@shanzhai`)).map((name) => [
      `@shanzhai`,
      name,
    ]),
  ].sort()) {
    output.push({
      name,
      json: await readPackageJson(name),
    });
  }

  return output;
}
