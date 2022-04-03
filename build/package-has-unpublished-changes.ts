import * as path from "path";
import { runCommandLine } from "./run-command-line";

export async function packageHasUnpublishedChanges(
  name: ReadonlyArray<string>
): Promise<boolean> {
  let publishedShasum: string;
  try {
    publishedShasum = (
      await runCommandLine(
        `npm view ${name.join(`/`)} dist.shasum`,
        process.cwd()
      )
    ).stdout.trim();
  } catch (e) {
    if (e instanceof Error && !/ is not in .+ registry\./.test(e.message)) {
      throw e;
    }
    publishedShasum = `none`;
  }

  const packOutput = (
    await runCommandLine(`npm pack`, path.join(process.cwd(), ...name))
  ).stderr;

  const packOutputMatches = /^npm notice shasum:\s*([0-9a-f]+)\s*$/m.exec(
    packOutput
  );

  let packedShasum: string;

  if (packOutputMatches) {
    packedShasum = packOutputMatches[1];
  } else {
    packedShasum = `unknown`;
  }

  return packedShasum !== publishedShasum;
}
