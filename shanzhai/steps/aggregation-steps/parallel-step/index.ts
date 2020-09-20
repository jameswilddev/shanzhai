import { Step } from "../../step";
import { ActionStep } from "../../action-steps/action-step";

export class ParallelStep implements Step {
  constructor(
    public readonly name: string,
    public readonly children: ReadonlyArray<Step>
  ) {}

  async executePerActionStep(
    callback: (actionStep: ActionStep) => Promise<void>
  ): Promise<void> {
    await Promise.all(
      this.children.map((child) => child.executePerActionStep(callback))
    );
  }
}
