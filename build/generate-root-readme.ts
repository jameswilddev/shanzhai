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

### Command-Line Executables

${await generateRootReadmePackageTable(commandLineExecutables)}

### Plugins

${await generateRootReadmePackageTable(plugins)}

### Steps

${await generateRootReadmePackageTable(steps)}

### Inputs

${await generateRootReadmePackageTable(inputs)}

### Outputs

${await generateRootReadmePackageTable(outputs)}

### Stores

${await generateRootReadmePackageTable(stores)}

### Other

${await generateRootReadmePackageTable(other)}

${generateReadmeFooter()}
`;
}
