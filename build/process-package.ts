import { writeReadme } from "./write-readme";
import { copyLicense } from "./copy-license";
import { writePackageJson } from "./write-package-json";
import { installDependencies } from "./install-dependencies";

export async function processPackage(pkg: {
  readonly name: ReadonlyArray<string>;
  readonly json: {
    readonly description: string;
    readonly version: string;
    readonly dependencies?: { readonly [name: string]: string };
    readonly peerDependencies?: { readonly [name: string]: string };
    readonly devDependencies?: { readonly [name: string]: string };
    readonly bin?: { readonly [name: string]: string };
    readonly scripts?: { readonly [name: string]: string };
    readonly shanzhaiPlugin?: true;
  };
}): Promise<void> {
  await Promise.all([
    writeReadme(
      pkg.name,
      pkg.json.description,
      pkg.json.dependencies,
      pkg.json.peerDependencies
    ),
    copyLicense(pkg.name),
    (async () => {
      await writePackageJson(pkg.name, pkg.json);
      await installDependencies(pkg.name);
    })(),
  ]);
}
