import { generateRootReadmeBadges } from "./generate-root-readme-badges";
import { readReadmeContent } from "./read-readme-content";
import { generateRootReadmePackageTable } from "./generate-root-readme-package-table";
import { generateReadmeFooter } from "./generate-readme-footer";
import { getAllPackages } from "./get-all-packages";

export async function generateRootReadme(): Promise<string> {
  const packages = await getAllPackages();

  const commandLineExecutables = packages.filter(({ name }) =>
    name[name.length - 1].endsWith(`-cli`)
  );

  const plugins = packages.filter(({ name }) =>
    name[name.length - 1].endsWith(`-plugin`)
  );

  const steps = packages.filter(({ name }) =>
    name[name.length - 1].endsWith(`-step`)
  );

  const inputs = packages.filter(({ name }) =>
    name[name.length - 1].endsWith(`-input`)
  );

  const outputs = packages.filter(({ name }) =>
    name[name.length - 1].endsWith(`-output`)
  );

  const stores = packages.filter(({ name }) =>
    name[name.length - 1].endsWith(`-store`)
  );

  const other = packages.filter(
    (step) =>
      ![
        ...commandLineExecutables,
        ...plugins,
        ...steps,
        ...inputs,
        ...outputs,
        ...stores,
      ].includes(step)
  );

  return `# Shanzhai ${generateRootReadmeBadges()}${await readReadmeContent([])}

## NPM packages

### Plugins

For the most part, software built using Shanzhai is configured simply by adding
NPM dependencies upon plugins
(e.g. \`npm install --save-dev @shanzhai/read-type-script-files-plugin\`).  A
plugin will typically read information from one or more files or stores, apply a
transformation, then write the results to one or more files or stores.

Take note of and install any peer dependencies recommended upon installation of
these packages.

![Map](https://tinyurl.com/w799ywr9)

${await generateRootReadmePackageTable(plugins)}

### Command-Line Executables

These command-line executables can be ran using
[NPX](https://www.npmjs.com/package/npx) (e.g.
\`npx @shanzhai/production-cli\`).

${await generateRootReadmePackageTable(commandLineExecutables)}

### For extending Shanzhai

These packages are only needed should you wish to extend Shanzhai itself.

#### Steps

Whenever a plugin is triggered, it generates a step.

Most are "action steps", which perform a single operation such as reading a
file, compiling script or minifying mark-up.

Some are "aggregation steps", which allow multiple other steps to be executed in
parallel or serial.

${await generateRootReadmePackageTable(steps)}

#### Inputs

An input provides a value to a step during its execution.

While some perform transformations, most simply provide a value.  Inputs should
not be performing complex or potentially risky operations.

${await generateRootReadmePackageTable(inputs)}

#### Outputs

An output stores a value provided by a step during its execution.

As with inputs, most simply store a value.  Only simple and fast transformations
should be performed in outputs, and preferably none should be made at all.

${await generateRootReadmePackageTable(outputs)}

#### Stores

Stores are peer dependencies of plugins, and are used to pass data between them.

For example:

- A plugin to read TypeScript files from disk might write the read TypeScript
  into a keyed ephemeral store.
- A plugin might then read from that store to parse the files, writing the
  results to another keyed ephemeral store.
- Then, another plugin might collect all those parsed files to compile them,
  writing the result to an unkeyed ephemeral store.

${await generateRootReadmePackageTable(stores)}

#### Other

These packages do not fall into any of the above categories.

${await generateRootReadmePackageTable(other)}

${generateReadmeFooter()}
`;
}
