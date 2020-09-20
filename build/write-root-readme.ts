import * as fs from "fs";
import { generateRootReadme } from "./generate-root-readme";

export async function writeRootReadme(): Promise<void> {
  console.log(`Writing root readme...`);
  await fs.promises.writeFile(`readme.md`, await generateRootReadme());
}
