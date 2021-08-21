import { UnkeyedStore } from "@shanzhai/interfaces";

export class EphemeralUnkeyedStore<T> implements UnkeyedStore<T> {
  readonly type = `unkeyedStore`;

  private value: null | [T] = null;

  constructor(public readonly name: string) {}

  async get(): Promise<T> {
    if (this.value === null) {
      throw new Error(
        `Cannot get value of unset unkeyed store ${JSON.stringify(this.name)}.`
      );
    } else {
      return this.value[0];
    }
  }

  async set(value: T): Promise<void> {
    this.value = [value];
  }

  async delete(): Promise<void> {
    this.value = null;
  }
}
