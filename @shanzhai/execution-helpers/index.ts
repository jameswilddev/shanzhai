import * as Progress from "progress";
import { Step } from "@shanzhai/interfaces";

export async function execute(
  step: Step,
  logOutput: NodeJS.WritableStream
): Promise<boolean> {
  let totalActions = 0;

  await step.executePerActionStep(async (step) => {
    step;
    execute;

    totalActions++;
  });

  let successful = true;

  if (totalActions === 0) {
    logOutput.write(`No steps to execute.\n`);
  } else {
    const progress = new Progress(
      `:bar :current/:total (:percent) :etas :message`,
      {
        width: 40,
        total: totalActions + 1,
        stream: logOutput,
      }
    );

    progress.render({ message: `Starting...` });

    await step.executePerActionStep(async (step) => {
      if (successful) {
        progress.render({ message: step.name });

        try {
          await step.execute();
        } catch (e) {
          logOutput.write(`\nError in step "${step.name}":\n${e}\n`);
          successful = false;
          return;
        }

        progress.tick();
      }
    });

    if (successful) {
      progress.tick({ message: `Done.` });
    }
  }

  return successful;
}
