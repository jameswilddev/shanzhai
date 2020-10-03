import { ActionStep, Step } from "@shanzhai/interfaces";

export class SerialStep implements Step {
  constructor(
    public readonly name: string,
    public readonly children: ReadonlyArray<Step>
  ) {}

  async executePerActionStep(
    callback: (actionStep: ActionStep) => Promise<void>
  ): Promise<void> {
    for (const child of this.children) {
      await child.executePerActionStep(callback);
    }
  }

  readonly effects = this.children.map((child) => child.effects).flat();
}
