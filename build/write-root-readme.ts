import * as fs from "fs";
import { generateRootReadme } from "./generate-root-readme";

(async () => {
  console.log(`Writing root readme...`);
  await fs.promises.writeFile(`readme.md`, await generateRootReadme());
})()
  .then(() => {
    console.log(`Done`);
    process.exit(0);
  })
  .catch((error) => {
    console.error(`Failed.`);
    console.error(error);
    process.exit(1);
  });
