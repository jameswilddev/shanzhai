import { Input, Output, ActionStep, Json } from "@shanzhai/interfaces";

/**
 * An {@link ActionStep} which parses JSON.
 */
export class ParseJsonStep extends ActionStep {
  /**
   * @param name   A description of the operation being performed.
   * @param input  An {@link Input} which supplies the unparsed JSON.
   * @param output An {@link Output} which receives the parsed JSON.
   */
  constructor(
    name: string,
    public readonly input: Input<string>,
    public readonly output: Output<Json>
  ) {
    super(name, output.effects);
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    await this.output.set(JSON.parse(await this.input.get()));
  }
}
