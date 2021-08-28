import * as pug from "pug";
import { Input, Output, ActionStep } from "@shanzhai/interfaces";

/**
 * An {@link ActionStep} which parses Pug templates.
 */
export class ParsePugStep extends ActionStep {
  /**
   * @param name   A description of the operation being performed.
   * @param input  An {@link Input} which supplies the unparsed Pug pug template.
   * @param output An {@link Output} which receives the parsed Pug template.
   */
  constructor(
    public readonly name: string,
    public readonly input: Input<string>,
    public readonly output: Output<pug.compileTemplate>
  ) {
    super(name, output.effects);
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    await this.output.set(pug.compile(await this.input.get()));
  }
}
