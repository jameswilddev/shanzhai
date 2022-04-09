import { Input } from "@shanzhai/interfaces";

/**
 * Given a nested {@link Input} of an object where the values are strings, concatenates those values into a single string.
 */
export class ConcatenateObjectValuesInput implements Input<string> {
  /**
   * @param input The nested {@link Input} of an object of objects.
   */
  constructor(
    public readonly input: Input<{
      readonly [key: string]: string;
    }>
  ) {}

  /**
   * @inheritdoc
   */
  async get(): Promise<string> {
    const input = await this.input.get();

    return Object.entries(input)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map((entry) => entry[1])
      .join(``);
  }
}
