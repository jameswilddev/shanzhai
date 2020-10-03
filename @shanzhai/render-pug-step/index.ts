import * as pug from "pug";
import { Input, Output, ActionStep } from "@shanzhai/interfaces";

export class RenderPugStep extends ActionStep {
  constructor(
    public readonly name: string,
    public readonly template: Input<pug.compileTemplate>,
    public readonly locals: Input<pug.LocalsObject>,
    public readonly output: Output<string>
  ) {
    super(name, output.effects);
  }

  async execute(): Promise<void> {
    const template = await this.template.get();
    const locals = await this.locals.get();

    const rendered = template(locals);

    await this.output.set(rendered);
  }
}
