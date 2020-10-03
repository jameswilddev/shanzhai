import { ActionStep, Step } from "@shanzhai/interfaces";

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

  readonly effects = this.children.map((child) => child.effects).flat();
}
