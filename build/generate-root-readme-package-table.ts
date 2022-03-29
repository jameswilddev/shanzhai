import { generateMarkdownTable } from "./generate-markdown-table";
import { getPublishedVersionOfPackage } from "./get-published-version-of-package";
import { packageHasUnpublishedChanges } from "./package-has-unpublished-changes";

export async function generateRootReadmePackageTable(
  packages: ReadonlyArray<{
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
): Promise<string> {
  return generateMarkdownTable(
    [
      [`subdirectoryLink`, `Name`],
      [`npmLink`, `Version`],
      [`description`, `Description`],
      [`published`, `Published`],
    ],
    `name`,
    await Promise.all(
      packages.map(async (pkg) => {
        return {
          name: pkg.name.join(`/`),
          subdirectoryLink: `[${pkg.name.join(`/`)}](${pkg.name.join(`/`)})`,
          npmLink: `[![${getPublishedVersionOfPackage(
            pkg.name
          )}](https://img.shields.io/npm/v/${pkg.name.join(
            `/`
          )}.svg)](https://www.npmjs.com/package/${pkg.name.join(`/`)})`,
          description: pkg.json.description,
          published: (await packageHasUnpublishedChanges(pkg.name))
            ? `❌`
            : `✔️`,
        };
      })
    )
  );
}
