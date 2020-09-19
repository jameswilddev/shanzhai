import { ActionStep } from "../action-step";

export class NullStep extends ActionStep {
  constructor(public readonly name: string) {
    super(name);
  }

  async execute(): Promise<void> {}
}
