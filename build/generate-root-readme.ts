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

A crude, plugin-based plugin system built upon NodeJS.

## NPM packages

![Map](https://nomnoml.com/image.svg?source=%5B%3Cdatabase%3E%40shanzhai%2Fsvg-def-store%5D%20-%3E%20%5B%40shanzhai%2Fcollect-svg-defs-plugin%5D%0A%5B%40shanzhai%2Fcollect-svg-defs-plugin%5D%20-%3E%20%5B%3Cdatabase%3E%40shanzhai%2Ftype-script-source-store%5D%0A%5B%40shanzhai%2Fcollect-svg-defs-plugin%5D%20-%3E%20%5B%3Cdatabase%3E%40shanzhai%2Ftype-script-global-store%5D%0A%5B%40shanzhai%2Fcollect-svg-defs-plugin%5D%20-%3E%20%5B%3Cdatabase%3E%40shanzhai%2Fpug-local-store%5D%0A%5B%3Cdatabase%3E%40shanzhai%2Fparsed-type-script-store%5D%20-%3E%20%5B%40shanzhai%2Fcompile-type-script-plugin%5D%0A%5B%3Cdatabase%3E%40shanzhai%2Ftype-script-compiler-options-store%5D%20-%3E%20%5B%40shanzhai%2Fcompile-type-script-plugin%5D%0A%5B%40shanzhai%2Fcompile-type-script-plugin%5D%20-%3E%20%5B%3Cdatabase%3E%40shanzhai%2Fjavascript-source-store%5D%0A%5B%3Cdatabase%3E%40shanzhai%2Fminified-svg-store%5D%20-%3E%20%5B%40shanzhai%2Fconvert-svg-documents-to-defs-plugin%5D%0A%5B%40shanzhai%2Fconvert-svg-documents-to-defs-plugin%5D%20-%3E%20%5B%3Cdatabase%3E%40shanzhai%2Fsvg-def-store%5D%0A%5B%40shanzhai%2Fes5-type-script-compiler-options-plugin%5D%20-%3E%20%5B%3Cdatabase%3E%40shanzhai%2Ftype-script-compiler-options-store%5D%0A%5B%3Cdatabase%3E%40shanzhai%2Fhtml-source-store%5D%20-%3E%20%5B%40shanzhai%2Fminify-html-plugin%5D%0A%5B%40shanzhai%2Fminify-html-plugin%5D%20-%3E%20%5B%3Cdatabase%3E%40shanzhai%2Fzip-content-store%5D%0A%5B%3Cdatabase%3E%40shanzhai%2Fjavascript-source-store%5D%20-%3E%20%5B%40shanzhai%2Fminify-javascript-plugin%5D%0A%5B%3Cdatabase%3E%40shanzhai%2Ftype-script-global-store%5D%20-%3E%20%5B%40shanzhai%2Fminify-javascript-plugin%5D%0A%5B%40shanzhai%2Fminify-javascript-plugin%5D%20-%3E%20%5B%3Cdatabase%3E%40shanzhai%2Fpug-local-store%5D%0A%5B%3Cdatabase%3E%40shanzhai%2Fsvg-source-store%5D%20-%3E%20%5B%40shanzhai%2Fminify-svg-plugin%5D%0A%5B%40shanzhai%2Fminify-svg-plugin%5D%20-%3E%20%5B%3Cdatabase%3E%40shanzhai%2Fminified-svg-store%5D%0A%5B%3Cdatabase%3E%40shanzhai%2Ftype-script-compiler-options-store%5D%20-%3E%20%5B%40shanzhai%2Foutput-type-script-compiler-options-plugin%5D%0A%5B%40shanzhai%2Foutput-type-script-compiler-options-plugin%5D%20-%20%5B%3Csocket%3E%20tsconfig.json%5D%0A%5B%3Cdatabase%3E%40shanzhai%2Fzip-content-store%5D%20-%3E%20%5B%40shanzhai%2Foutput-zip-content-plugin%5D%0A%5B%40shanzhai%2Foutput-zip-content-plugin%5D%20-%20%5B%3Csocket%3Edist%2Fcontent%2F**%5D%0A%5B%3Cdatabase%3E%40shanzhai%2Fzip-store%5D%20-%3E%20%5B%40shanzhai%2Foutput-zip-plugin%5D%0A%5B%40shanzhai%2Foutput-zip-plugin%5D%20-%20%5B%3Csocket%3E%20dist%2Fdistributable.zip%5D%0A%5B%3Cdatabase%3E%40shanzhai%2Fpug-source-store%5D%20-%3E%20%5B%40shanzhai%2Fparse-pug-plugin%5D%0A%5B%40shanzhai%2Fparse-pug-plugin%5D%20-%3E%20%5B%3Cdatabase%3E%40shanzhai%2Fparsed-pug-store%5D%0A%5B%3Cdatabase%3E%40shanzhai%2Ftype-script-source-store%5D%20-%3E%20%5B%40shanzhai%2Fparse-type-script-plugin%5D%0A%5B%3Cdatabase%3E%40shanzhai%2Ftype-script-compiler-options-store%5D%20-%3E%20%5B%40shanzhai%2Fparse-type-script-plugin%5D%0A%5B%40shanzhai%2Fparse-type-script-plugin%5D%20-%3E%20%5B%3Cdatabase%3E%40shanzhai%2Fparsed-type-script-store%5D%0A%5B%3Clollipop%3Esrc%2F**.pug%5D%20-%20%5B%40shanzhai%2Fread-pug-files-plugin%5D%0A%5B%40shanzhai%2Fread-pug-files-plugin%5D%20-%3E%20%5B%3Cdatabase%3E%40shanzhai%2Fpug-source-store%5D%0A%5B%3Clollipop%3Esrc%2F**.svg%5D%20-%20%5B%40shanzhai%2Fread-svg-files-plugin%5D%0A%5B%40shanzhai%2Fread-svg-files-plugin%5D%20-%3E%20%5B%3Cdatabase%3E%40shanzhai%2Fsvg-source-store%5D%0A%5B%3Clollipop%3Esrc%2F**.ts%5D%20-%20%5B%40shanzhai%2Fread-type-script-files-plugin%5D%0A%5B%40shanzhai%2Fread-type-script-files-plugin%5D%20-%3E%20%5B%3Cdatabase%3E%40shanzhai%2Ftype-script-source-store%5D%0A%5B%3Cdatabase%3E%40shanzhai%2Fparsed-pug-store%5D%20-%3E%20%5B%40shanzhai%2Frender-pug-plugin%5D%0A%5B%3Cdatabase%3E%40shanzhai%2Fpug-local-store%5D%20-%3E%20%5B%40shanzhai%2Frender-pug-plugin%5D%0A%5B%40shanzhai%2Frender-pug-plugin%5D%20-%3E%20%5B%3Cdatabase%3E%40shanzhai%2Fhtml-source-store%5D%0A%5B%3Cdatabase%3E%40shanzhai%2Fzip-content-store%5D%20-%3E%20%5B%40shanzhai%2Fzip-plugin%5D%0A%5B%40shanzhai%2Fzip-plugin%5D%20-%3E%20%5B%3Cdatabase%3E%40shanzhai%2Fzip-store%5D%0A%0A%5B%3Csocket%3Etsconfig.json%5D%20-%2F-%20%5B%3Chidden%3E%20outputs%5D%0A%5B%3Csocket%3Edist%2Fdistributable.zip%5D%20-%2F-%20%5B%3Chidden%3E%20outputs%5D%0A%5B%3Csocket%3Edist%2Fcontent%2F**%5D%20-%2F-%20%5B%3Chidden%3E%20outputs%5D)

### Plugins

For the most part, software built using Shanzhai is configured simply by adding
NPM dependencies upon plugins
(e.g. \`npm install --save-dev @shanzhai/read-type-script-files-plugin\`).  A
plugin will typically read information from one or more files or stores, apply a
transformation, then write the results to one or more files or stores.

Take note of and install any peer dependencies recommended upon installation of
these packages.

${await generateRootReadmePackageTable(plugins)}

### Command-Line Executables

These command-line executables can be ran using
[NPX](https://www.npmjs.com/package/npx) (e.g.
\`npx @shanzhai/production-cli\`).

${await generateRootReadmePackageTable(commandLineExecutables)}

### For extending Shanzhai

These packages are only needed should you wish to extend the Shanzhai itself.

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
  writing the result to an unkeyed ephemeral store,

${await generateRootReadmePackageTable(stores)}

#### Other

These packages do not fall into any of the above categories.

${await generateRootReadmePackageTable(other)}

${generateReadmeFooter()}
`;
}
