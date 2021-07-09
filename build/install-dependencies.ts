import * as path from "path";
import { runCommandLine } from "./run-command-line";

export async function installDependencies(
  name: ReadonlyArray<string>
): Promise<void> {
  console.log(`${name.join(`/`)} - Installing dependencies...`);
  const command = process.env.SHANZHAI_CI ? `ci` : `install`;
  console.log(
    `${name.join(`/`)} - ${
      (await runCommandLine(`npm ${command}`, path.join(...name))).stdout
    }`
  );
}
