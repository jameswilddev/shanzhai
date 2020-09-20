import * as fs from "fs";
import * as path from "path";

export async function readReadmeContent(
  name: ReadonlyArray<string>
): Promise<string> {
  const readmeContentPath = path.join(...[...name, `readme-content.md`]);
  const readmeContent = await fs.promises.readFile(readmeContentPath, `utf8`);
  const trimmed = readmeContent.trim();

  if (trimmed === ``) {
    return readmeContent;
  }

  return `

${trimmed}`;
}
