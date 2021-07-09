import { getAllPackages } from "./get-all-packages";
import { processPackage } from "./process-package";
import { writeRootReadme } from "./write-root-readme";

export async function processAll(): Promise<void> {
  await Promise.all((await getAllPackages()).map(processPackage));

  await writeRootReadme();
}
