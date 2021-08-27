import * as path from "path";
import { generateMarkdownTable } from "./generate-markdown-table";
import { runCommandLine } from "./run-command-line";

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
  return `

${generateMarkdownTable(
  [
    [`subdirectoryLink`, `Name`],
    [`npmLink`, `Version`],
    [`description`, `Description`],
    [`published`, `Published`],
  ],
  `name`,
  await Promise.all(
    packages.map(async (pkg) => {
      let publishedVersion: string;
      try {
        publishedVersion = (
          await runCommandLine(
            `npm view ${pkg.name.join(`/`)} version`,
            process.cwd()
          )
        ).stdout.trim();
      } catch (e) {
        if (
          !(e instanceof Error) ||
          !e.message.includes(` is not in the npm registry.`)
        ) {
          throw e;
        }
        publishedVersion = `none`;
      }

      let publishedShasum: string;
      try {
        publishedShasum = (
          await runCommandLine(
            `npm view ${pkg.name.join(`/`)} dist.shasum`,
            process.cwd()
          )
        ).stdout.trim();
      } catch (e) {
        if (
          e instanceof Error &&
          !e.message.includes(` is not in the npm registry.`)
        ) {
          throw e;
        }
        publishedShasum = `none`;
      }

      const packOutput = (
        await runCommandLine(`npm pack`, path.join(process.cwd(), ...pkg.name))
      ).stderr;

      const packOutputMatches = /^npm notice shasum:\s*([0-9a-f]+)\s*$/m.exec(
        packOutput
      );

      let packedShasum: string;

      if (packOutputMatches) {
        packedShasum = packOutputMatches[1];
      } else {
        packedShasum = `unknown`;
      }

      return {
        name: pkg.name.join(`/`),
        subdirectoryLink: `[${pkg.name.join(`/`)}](${pkg.name.join(`/`)})`,
        npmLink: `[![${publishedVersion}](https://img.shields.io/npm/v/${pkg.name.join(
          `/`
        )}.svg)](https://www.npmjs.com/package/${pkg.name.join(`/`)})`,
        description: pkg.json.description,
        published: packedShasum === publishedShasum ? `✔️` : `❌`,
      };
    })
  )
)}`;
}
