import { generateMarkdownTable } from "./generate-markdown-table";

export function generateReadmeDependencies(dependencies?: {
  readonly [name: string]: string;
}): string {
  if (
    !dependencies ||
    !Object.keys(dependencies).some(
      (dependency) => !dependency.startsWith(`@shanzhai/`)
    )
  ) {
    return `## Dependencies

This package has no runtime dependencies.`;
  }

  return `## Dependencies

This package has the following runtime dependencies:

${generateMarkdownTable(
  [
    [`name`, `Name`],
    [`npmLink`, `Version`],
  ],
  `name`,
  Object.entries(dependencies)
    .filter((dependency) => !dependency[0].startsWith(`@shanzhai/`))
    .map((dependency) => ({
      name: dependency[0],
      npmLink: `[![${dependency[1]}](https://img.shields.io/npm/v/${dependency[0]}.svg)](https://www.npmjs.com/package/${dependency[0]})`,
    }))
)}`;
}
