import { Input, Json } from "@shanzhai/interfaces";

/**
 * An {@link Input} which converts a nested {@link Input}'s value to a string of
 * JSON.
 */
export class StringifyJsonInput implements Input<string> {
  /**
   * @param input The nested {@link Input}, the value of which is to be
   *              converted to a string of JSON.
   */
  constructor(public readonly input: Input<Json>) {}

  /**
   * @inheritdoc
   */
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
            .filter(([, value]) => value !== undefined)
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
