import * as uglifyJs from "uglify-js";
import { Input, Output, Json } from "@shanzhai/interfaces";
import { MinifyStep } from "../minify-step";

export class MinifyJavascriptStep<
  TConstants extends { readonly [key: string]: Json }
> extends MinifyStep<string> {
  constructor(
    name: string,
    input: Input<string>,
    public readonly constants: Input<TConstants>,
    output: Output<string>
  ) {
    super(name, input, output);
  }

  readonly maximumIterations = 10;

  private constantsCache: null | TConstants = null;

  async iterate(value: string): Promise<string> {
    if (this.constantsCache === null) {
      this.constantsCache = this.constants.get();
    }

    const parsed = uglifyJs.minify(value, {
      compress: {
        global_defs: this.constantsCache,
      },
      mangle: true,
      toplevel: true,
    });

    if (parsed.error) {
      throw new Error(
        `Error minifying Javascript: ${JSON.stringify(parsed.error)}.`
      );
    }

    return parsed.code;
  }
}
