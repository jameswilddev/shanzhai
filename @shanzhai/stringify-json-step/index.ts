import { Input, Output, ActionStep, Json } from "@shanzhai/interfaces";

/**
 * An {@link ActionStep} which converts values to strings of JSON.
 */
export class StringifyJsonStep extends ActionStep {
  /**
   *
   * @param name   A description of the operation being performed.
   * @param input  An {@link Input} from which to read a value to convert.
   * @param output An {@link Output} to which to write the resulting string of
   *               JSON.
   */
  constructor(
    name: string,
    public readonly input: Input<Json>,
    public readonly output: Output<string>
  ) {
    super(name, output.effects);
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    const json = await this.input.get();

    const recurse = (json: Json): string => {
      if (json === null) {
        return `null`;
      } else if (typeof json === `object`) {
        if (Array.isArray(json)) {
          return `[${json.map(recurse).join(`,`)}]`;
        } else {
          return `{${Object.entries(json)
            .filter(([, value]) => value !== undefined)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => `${JSON.stringify(key)}:${recurse(value)}`)
            .join(`,`)}}`;
        }
      } else {
        return JSON.stringify(json);
      }
    };

    await this.output.set(recurse(json));
  }
}
