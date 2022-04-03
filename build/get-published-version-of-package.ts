import { runCommandLine } from "./run-command-line";

export async function getPublishedVersionOfPackage(
  name: ReadonlyArray<string>
): Promise<string> {
  try {
    return (
      await runCommandLine(`npm view ${name.join(`/`)} version`, process.cwd())
    ).stdout.trim();
  } catch (e) {
    if (!(e instanceof Error) || !/ is not in .+ registry\./.test(e.message)) {
      throw e;
    }
    return `none`;
  }
}
