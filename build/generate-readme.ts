import { generateRootReadmeBadges } from "./generate-root-readme-badges";
import { generateReadmeDependencies } from "./generate-readme-dependencies";
import { generateReadmeBadges } from "./generate-readme-badges";
import { readReadmeContent } from "./read-readme-content";
import { generateReadmeFooter } from "./generate-readme-footer";

export async function generateReadme(
  name: ReadonlyArray<string>,
  description: string,
  dependencies?: { readonly [name: string]: string }
): Promise<string> {
  return `# \`${name.join(
    `/`
  )}\` ${generateRootReadmeBadges()} ${generateReadmeBadges(name)}

${description}${await readReadmeContent(name)}

${generateReadmeDependencies(dependencies)}

${generateReadmeFooter()}
`;
}
