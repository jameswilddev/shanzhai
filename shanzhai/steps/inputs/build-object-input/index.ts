import { Input } from "../input";

export class BuildObjectInput<TKey extends string, TValue>
  implements Input<{ readonly [key in TKey]: TValue }> {
  constructor(
    public readonly sources: {
      readonly [key in TKey]: Input<TValue>;
    }
  ) {}

  get(): { readonly [key in TKey]: TValue } {
    const output: { [key: string]: TValue } = {};

    for (const key in this.sources) {
      output[key] = this.sources[key].get();
    }

    return output as { readonly [key in TKey]: TValue };
  }
}
