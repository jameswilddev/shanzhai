import { UnkeyedStore } from "@shanzhai/interfaces";

export interface ValueStoreInterface<T> extends UnkeyedStore {
  get(): T;

  set(value: T): void;

  delete(): void;
}
