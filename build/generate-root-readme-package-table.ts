import { getAllPackages } from "./get-all-packages";
import { generateMarkdownTable } from "./generate-markdown-table";
import { runCommandLine } from "./run-command-line";

export async function generateRootReadmePackageTable(): Promise<string> {
  return `## NPM packages

${generateMarkdownTable(
  [
    [`subdirectoryLink`, `Name`],
    [`npmLink`, `Version`],
    [`description`, `Description`],
    [`published`, `Published`],
  ],
  `name`,
  await Promise.all(
    (
      await getAllPackages()
    ).map(async (pkg) => {
      let publishedVersion: string;
      try {
        publishedVersion = (
          await runCommandLine(
            `npm view ${pkg.name.join(`/`)} version`,
            process.cwd()
          )
        ).stdout.trim();
      } catch (e) {
        if (!e.message.includes(` is not in the npm registry.`)) {
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
        if (!e.message.includes(` is not in the npm registry.`)) {
          throw e;
        }
        publishedShasum = `none`;
      }

      const packOutput = (
        await runCommandLine(`npm pack ${pkg.name.join(`/`)}`, process.cwd())
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
