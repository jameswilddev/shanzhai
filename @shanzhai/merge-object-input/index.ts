import { Input } from "@shanzhai/interfaces";

/**
 * Given a nested {@link Input} of an object where the values are themselves
 * objects, merges those objects into one.
 * @template TValue A value in the resulting object.
 */
export class MergeObjectInput<TValue>
  implements Input<{ readonly [key: string]: TValue }>
{
  /**
   * @param input The nested {@link Input} of an object of objects.
   */
  constructor(
    public readonly input: Input<{
      readonly [keyA: string]: { readonly [keyB: string]: TValue };
    }>
  ) {}

  /**
   * @inheritdoc
   */
  async get(): Promise<{ readonly [key: string]: TValue }> {
    const output: { [key: string]: TValue } = {};

    const input = await this.input.get();

    for (const keyA in input) {
      const valueA = input[keyA];

      for (const keyB in valueA) {
        if (Object.prototype.hasOwnProperty.call(output, keyB)) {
          throw new Error(
            `Unable to merge objects as key ${JSON.stringify(
              keyB
            )} exists in more than one source.`
          );
        }

        output[keyB] = valueA[keyB];
      }
    }

    return output;
  }
}
