import { Effect, Output, Json } from "@shanzhai/interfaces";

/**
 * An {@link Output} which converts values it is given to JSON before passing
 * them onto a nested {@link Output}.
 */
export class StringifyJsonOutput implements Output<Json> {
  /**
   * @inheritdoc
   */
  public readonly effects: ReadonlyArray<Effect>;

  /**
   * @param output The nested {@link Output}, which is to be provided the string
   *               of JSON generated.
   */
  constructor(public readonly output: Output<string>) {
    this.effects = output.effects;
  }

  /**
   * @inheritdoc
   */
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
