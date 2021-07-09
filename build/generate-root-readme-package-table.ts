import { getAllPackages } from "./get-all-packages";
import { generateMarkdownTable } from "./generate-markdown-table";

export async function generateRootReadmePackageTable(): Promise<string> {
  return `## NPM packages

${generateMarkdownTable(
  [
    [`subdirectoryLink`, `Name`],
    [`npmLink`, `Version`],
    [`description`, `Description`],
  ],
  `name`,
  (await getAllPackages()).map((p) => ({
    name: p.name.join(`/`),
    subdirectoryLink: `[${p.name.join(`/`)}](${p.name.join(`/`)})`,
    npmLink: `[![${p.json.version}](https://img.shields.io/npm/v/${p.name}.svg)](https://www.npmjs.com/package/${p.name})`,
    description: p.json.description,
  }))
)}`;
}
