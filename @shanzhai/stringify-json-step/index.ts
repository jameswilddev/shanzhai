import { Input, Output, ActionStep, Json } from "@shanzhai/interfaces";

export class StringifyJsonStep extends ActionStep {
  constructor(
    name: string,
    public readonly input: Input<Json>,
    public readonly output: Output<string>
  ) {
    super(name, output.effects);
  }

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
