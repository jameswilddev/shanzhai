import { allPackages } from "./all-packages";
import { generateMarkdownTable } from "./generate-markdown-table";

export function generateRootReadmePackageTable(): string {
  return `## NPM packages

${generateMarkdownTable(
  [
    [`subdirectoryLink`, `Name`],
    [`npmLink`, `Version`],
    [`description`, `Description`],
  ],
  `name`,
  allPackages.map((p) => ({
    name: p.name,
    subdirectoryLink: `[${p.name}](${p.name})`,
    npmLink: `[![${p.version}](https://img.shields.io/npm/v/${p.name}.svg)](https://www.npmjs.com/package/${p.name})`,
    description: p.description,
  }))
)}`;
}
