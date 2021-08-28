import { Input, Output, ActionStep, Json } from "@shanzhai/interfaces";

/**
 * An {@link ActionStep} which converts JSON to TypeScript type declarations.
 */
export class ConvertJsonToTypeScriptStep extends ActionStep {
  /**
   * @param name   A description of the operation being performed.
   * @param input  An {@link Input} for the declarations to convert to
   *               TypeScript type declarations.
   * @param output An {@link Output} for the generated TypeScript type
   *               declarations.
   */
  constructor(
    name: string,
    public readonly input: Input<{ readonly [key: string]: Json }>,
    public readonly output: Output<string>
  ) {
    super(name, output.effects);
  }

  async execute(): Promise<void> {
    const recurse = (json: Json): string => {
      if (json === null) {
        return `null`;
      } else if (typeof json === `object`) {
        if (Array.isArray(json)) {
          return `readonly [${json.map(recurse).join(`, `)}]`;
        } else {
          const entries = Object.entries(json);

          if (entries.length === 0) {
            return `{}`;
          } else {
            return `{ ${entries
              .sort(([a], [b]) => a.localeCompare(b))
              .map(
                ([key, value]) =>
                  `readonly ${JSON.stringify(key)}: ${recurse(value)}`
              )
              .join(`, `)} }`;
          }
        }
      } else {
        return JSON.stringify(json);
      }
    };

    const json = await this.input.get();

    let combined = ``;

    for (const key of Object.keys(json).sort()) {
      const value = json[key];

      const types = recurse(value);

      combined += `declare const ${key}: ${types};\n\n`;
    }

    await this.output.set(combined);
  }
}
