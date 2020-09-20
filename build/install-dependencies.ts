import * as path from "path";
import { runCommandLine } from "./run-command-line";

export async function installDependencies(
  name: ReadonlyArray<string>
): Promise<void> {
  console.log(`Installing dependencies...`);
  const command = process.env.SHANZHAI_CI ? `ci` : `install`;
  const cwd = process.cwd();
  process.chdir(path.join(...name));
  console.log(await runCommandLine(`npm ${command}`));
  process.chdir(cwd);
}
