import { Effect, Output, Json } from "@shanzhai/interfaces";

export class StringifyJsonOutput implements Output<Json> {
  public readonly effects: ReadonlyArray<Effect>;

  constructor(public readonly output: Output<string>) {
    this.effects = output.effects;
  }

  async set(value: Json): Promise<void> {
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

    await this.output.set(recurse(value));
  }
}
