import { ActionStep } from "../../action-step";
import { Input } from "../../../inputs/input";
import { Output } from "../../../outputs/output";
import { Json } from "../../../../json";

export type KeyedJson = { readonly [key: string]: Json };

export class ConvertJsonToTypeScriptStep extends ActionStep {
  constructor(
    name: string,
    public readonly input: Input<KeyedJson>,
    public readonly output: Output<string>
  ) {
    super(name);
  }

  async execute(): Promise<void> {
    const recurse = (json: Json, prefix: string): string => {
      if (json === null) {
        return `null`;
      } else if (typeof json === `object`) {
        if (Array.isArray(json)) {
          return `${prefix}[${json
            .map((item) => recurse(item, prefix))
            .join(`, `)}]`;
        } else {
          const entries = Object.entries(json);

          if (entries.length === 0) {
            return `{}`;
          } else {
            return `{ ${entries
              .sort(([a], [b]) => a.localeCompare(b))
              .map(
                ([key, value]) =>
                  `${prefix}${JSON.stringify(key)}: ${recurse(value, prefix)}`
              )
              .join(`, `)} }`;
          }
        }
      } else {
        return JSON.stringify(json);
      }
    };

    const json = this.input.get();

    let combined = ``;

    for (const key of Object.keys(json).sort()) {
      const value = json[key];

      const types = recurse(value, `readonly `);
      const values = recurse(value, ``);

      combined += `const ${key}: ${types} = ${values};\n\n`;
    }

    this.output.set(combined);
  }
}
