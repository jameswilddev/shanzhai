import { Input, Output, ActionStep } from "@shanzhai/interfaces";

export abstract class MinifyStep<T> extends ActionStep {
  constructor(
    name: string,
    public readonly input: Input<T>,
    public readonly output: Output<T>
  ) {
    super(name, output.effects);
  }

  abstract readonly maximumIterations: number;

  abstract iterate(value: T): Promise<T>;

  async execute(): Promise<void> {
    let value = await this.input.get();

    for (let i = 0; i < this.maximumIterations; i++) {
      const next = await this.iterate(value);

      if (next === value) {
        await this.output.set(value);
        return;
      } else {
        value = next;
      }
    }

    throw new Error(
      `Failed to stably minify after ${this.maximumIterations} iteration(s).`
    );
  }
}
