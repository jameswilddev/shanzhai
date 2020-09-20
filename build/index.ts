import { processAll } from "./process-all";

processAll()
  .then(() => {
    console.log(`Done`);
    process.exit(0);
  })
  .catch((error) => {
    console.error(`Failed.`);
    console.error(error);
    process.exit(1);
  });
