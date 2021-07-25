import { ValueStoreInterface } from "../value-store-interface";

export class ValueStore<T> implements ValueStoreInterface<T> {
  readonly type = `unkeyedStore`;

  private value: null | [T] = null;

  constructor(public readonly name: string) {}

  get(): T {
    if (this.value === null) {
      throw new Error(
        `Cannot get value of unset value store ${JSON.stringify(this.name)}.`
      );
    } else {
      return this.value[0];
    }
  }

  set(value: T): void {
    this.value = [value];
  }

  delete(): void {
    this.value = null;
  }
}
