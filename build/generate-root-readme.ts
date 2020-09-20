import { generateRootReadmeBadges } from "./generate-root-readme-badges";
import { readReadmeContent } from "./read-readme-content";
import { generateRootReadmePackageTable } from "./generate-root-readme-package-table";
import { generateReadmeFooter } from "./generate-readme-footer";

export async function generateRootReadme(): Promise<string> {
  return `# Shanzhai ${generateRootReadmeBadges()}${await readReadmeContent([])}

${generateRootReadmePackageTable()}

${generateReadmeFooter()}
`;
}
