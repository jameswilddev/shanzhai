import * as pug from "pug";
import { Input, Output, ActionStep } from "@shanzhai/interfaces";

/**
 * An {@link ActionStep} which renders a previously parsed Pug template.
 */
export class RenderPugStep extends ActionStep {
  /**
   * @param name     A description of the operation being performed.
   * @param template An {@link Input} from which to retrieve the previously
   *                 parsed Pug template
   * @param locals   An {@link Input} from which to retrieve the locals object
   *                 to provide to the template.
   * @param output   An {@link Output} to which to provide the rendered HTML.
   */
  constructor(
    public readonly name: string,
    public readonly template: Input<pug.compileTemplate>,
    public readonly locals: Input<pug.LocalsObject>,
    public readonly output: Output<string>
  ) {
    super(name, output.effects);
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    const template = await this.template.get();
    const locals = await this.locals.get();

    const rendered = template(locals);

    await this.output.set(rendered);
  }
}
