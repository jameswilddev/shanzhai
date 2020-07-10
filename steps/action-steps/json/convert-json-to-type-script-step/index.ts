import { ActionStep } from "../../action-step";
import { Input } from "../../../inputs/input";
import { Output } from "../../../outputs/output";
import { Json } from "../../../../json";

export class ConvertJsonToTypeScriptStep extends ActionStep {
  constructor(
    name: string,
    public readonly declarationName: string,
    public readonly input: Input<Json>,
    public readonly output: Output<string>
  ) {
    super(name);
  }

  async execute(): Promise<void> {
    const json = this.input.get();

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

    const types = recurse(json, `readonly `);
    const values = recurse(json, ``);

    this.output.set(`const ${this.declarationName}: ${types} = ${values};`);
  }
}
