import { Input } from "@shanzhai/interfaces";

/**
 * An {@link Input} which builds an object from the values provided by a number
 * of nested {@link Input}s.
 * @template TKey The keys of the built object.
 * @template TValue The values of the built object.
 */
export class BuildObjectInput<TKey extends string, TValue>
  implements Input<{ readonly [key in TKey]: TValue }>
{
  /**
   * @param sources An object of the {@link Input}s to read to build an object.
   * Keys will be reflected in the built object, but the values will be those
   * read from the nested {@link Input}s, not the {@link Input}s themselves.
   */
  constructor(
    public readonly sources: {
      readonly [key in TKey]: Input<TValue>;
    }
  ) {}

  /**
   * @inheritdoc
   */
  async get(): Promise<{ readonly [key in TKey]: TValue }> {
    const output: { [key: string]: TValue } = {};

    for (const key in this.sources) {
      output[key] = await this.sources[key].get();
    }

    return output as { readonly [key in TKey]: TValue };
  }
}
