import { getAllPackages } from "./get-all-packages";
import { processPackage } from "./process-package";

export async function processAll(): Promise<void> {
  await Promise.all((await getAllPackages()).map(processPackage));
}
