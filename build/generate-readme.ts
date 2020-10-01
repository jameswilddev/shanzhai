import { generateRootReadmeBadges } from "./generate-root-readme-badges";
import { generateReadmeDependencies } from "./generate-readme-dependencies";
import { generateReadmeBadges } from "./generate-readme-badges";
import { readReadmeContent } from "./read-readme-content";
import { generateReadmeFooter } from "./generate-readme-footer";

export async function generateReadme(
  name: ReadonlyArray<string>,
  description: string,
  dependencies: undefined | { readonly [name: string]: string },
  peerDependencies: undefined | { readonly [name: string]: string }
): Promise<string> {
  return `# \`${name.join(
    `/`
  )}\` ${generateRootReadmeBadges()} ${generateReadmeBadges(name)}

${description}${await readReadmeContent(name)}

${generateReadmeDependencies(
  dependencies,
  `Dependencies`,
  `This package has no runtime dependencies.`,
  `This package has the following runtime dependencies:`
)}

${generateReadmeDependencies(
  peerDependencies,
  `Peer Dependencies`,
  `This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).`,
  `This package has the following runtime dependencies; that is, it expects the following packages to be installed alongside itself:`
)}

${generateReadmeFooter()}
`;
}
