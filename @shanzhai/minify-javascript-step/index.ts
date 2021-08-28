import * as uglifyJs from "uglify-js";
import { Input, Output, Json } from "@shanzhai/interfaces";
import { MinifyStep } from "@shanzhai/minify-step";

/**
 * Minifies Javascript.
 */
export class MinifyJavascriptStep<
  TConstants extends { readonly [key: string]: Json }
> extends MinifyStep<string> {
  /**
   * @param name      A description of the operation being performed.
   * @param input     An {@link Input} from which to retrieve the unminified
   *                  value.
   * @param constants An {@link Input} from which to retrieve constants which
   *                  are to be injected via global scope.
   * @param output    An {@link Output} to which to write the minified value.
   */
  constructor(
    name: string,
    input: Input<string>,
    public readonly constants: Input<TConstants>,
    output: Output<string>
  ) {
    super(name, input, output);
  }

  /**
   * @inheritdoc
   */
  readonly maximumIterations = 10;

  private constantsCache: null | TConstants = null;

  /**
   * @inheritdoc
   */
  async iterate(value: string): Promise<string> {
    if (this.constantsCache === null) {
      this.constantsCache = await this.constants.get();
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
