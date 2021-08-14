import { Input, Json } from "@shanzhai/interfaces";

export class StringifyJsonInput implements Input<string> {
  constructor(public readonly input: Input<Json>) {}

  async get(): Promise<string> {
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

    return recurse(json);
  }
}
