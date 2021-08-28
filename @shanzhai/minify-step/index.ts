import { Input, Output, ActionStep } from "@shanzhai/interfaces";

/**
 * A base class for iterative minification {@link ActionStep}s.
 * @template T The value which is iteratively minified.
 */
export abstract class MinifyStep<T> extends ActionStep {
  /**
   * @param name   A description of the operation being performed.
   * @param input  An {@link Input} from which to retrieve the unminified value.
   * @param output An {@link Output} to which to write the minified value.
   */
  constructor(
    name: string,
    public readonly input: Input<T>,
    public readonly output: Output<T>
  ) {
    super(name, output.effects);
  }

  /**
   * The maximum number of iterations to perform before stopping.
   */
  abstract readonly maximumIterations: number;

  /**
   * Performs a single iteration of minification.
   * @param value The value to minify.
   * @returns The minified value.
   */
  abstract iterate(value: T): Promise<T>;

  /**
   * @inheritdoc
   */
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
