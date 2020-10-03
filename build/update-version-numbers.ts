import * as fs from "fs";
import * as path from "path";

(async () => {
  const target = process.argv[2];

  for (const packageName of [
    `shanzhai`,
    ...(await fs.promises.readdir(`@shanzhai`)).map((name) =>
      path.join(`@shanzhai`, name)
    ),
  ]) {
    console.log(`Reading ${JSON.stringify(packageName)}...`);
    const jsonPath = path.join(packageName, `package.json`);
    const text = await fs.promises.readFile(jsonPath, `utf8`);
    const json = JSON.parse(text);

    let upgrade = false;

    const processList = (list: undefined | { [name: string]: string }) => {
      if (
        list !== undefined &&
        Object.prototype.hasOwnProperty.call(list, target)
      ) {
        upgrade = true;
      }
    };

    processList(json.dependencies);
    processList(json.devDependencies);
    processList(json.peerDependencies);

    if (upgrade) {
      const fragments = json.version.split(`.`);
      fragments[fragments.length - 1] = String(
        Number(fragments[fragments.length - 1]) + 1
      );

      json.version = fragments.join(`.`);

      const updatedText = JSON.stringify(json);

      console.log(`Writing ${JSON.stringify(packageName)}...`);
      await fs.promises.writeFile(jsonPath, updatedText);
    }
  }
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
