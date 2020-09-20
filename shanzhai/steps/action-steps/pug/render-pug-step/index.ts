import * as pug from "pug";
import { Input, Output, ActionStep } from "@shanzhai/interfaces";

export class RenderPugStep extends ActionStep {
  constructor(
    public readonly name: string,
    public readonly template: Input<pug.compileTemplate>,
    public readonly locals: Input<pug.LocalsObject>,
    public readonly output: Output<string>
  ) {
    super(name);
  }

  async execute(): Promise<void> {
    const template = this.template.get();
    const locals = this.locals.get();

    const rendered = template(locals);

    this.output.set(rendered);
  }
}
