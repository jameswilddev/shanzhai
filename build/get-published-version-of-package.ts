import { runCommandLine } from "./run-command-line";

export async function getPublishedVersionOfPackage(
  name: ReadonlyArray<string>
): Promise<string> {
  try {
    return (
      await runCommandLine(`npm view ${name.join(`/`)} version`, process.cwd())
    ).stdout.trim();
  } catch (e) {
    if (
      !(e instanceof Error) ||
      !e.message.includes(` is not in the npm registry.`)
    ) {
      throw e;
    }
    return `none`;
  }
}
