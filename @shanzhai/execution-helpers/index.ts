import * as Progress from "progress";
import { Step } from "@shanzhai/interfaces";

/**
 * Executes a previously planned build.
 * @param step      The root {@link Step} previously planned build.
 * @param logOutput A {@link NodeJS.WritableStream} to which to write logs.
 * @returns         Resolves to true when the build succeeds; otherwise returns
 *                  false.
 */
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
    logOutput.write(`Starting...\n`);

    if ((logOutput as unknown as { isTTY?: boolean }).isTTY) {
      const progress = new Progress(
        `:bar :current/:total (:percent) :etas :message`,
        {
          width: 40,
          total: totalActions,
          stream: logOutput,
          renderThrottle: -1,
        }
      );

      await step.executePerActionStep(async (step) => {
        if (successful) {
          progress.render({ message: `Starting "${step.name}"...` });

          try {
            await step.execute();
          } catch (e) {
            logOutput.write(`\nError in step "${step.name}":\n${e}\n`);
            successful = false;
            return;
          }

          progress.tick({
            message: `Step "${step.name}" completed successfully.`,
          });
        }
      });
    } else {
      let completedActions = 0;

      await step.executePerActionStep(async (step) => {
        if (successful) {
          logOutput.write(
            `${completedActions}/${totalActions} (${Math.round(
              (100 * completedActions) / totalActions
            )}%) Starting "${step.name}"...\n`
          );

          try {
            await step.execute();
          } catch (e) {
            logOutput.write(`\nError in step "${step.name}":\n${e}\n`);
            successful = false;
            return;
          }

          completedActions++;

          logOutput.write(
            `${completedActions}/${totalActions} (${Math.round(
              (100 * completedActions) / totalActions
            )}%) Step "${step.name}" completed successfully.\n`
          );
        }
      });
    }

    if (successful) {
      logOutput.write(`Done.\n`);
    }
  }

  return successful;
}
