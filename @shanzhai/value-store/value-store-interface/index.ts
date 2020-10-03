import { Store } from "@shanzhai/interfaces";

export interface ValueStoreInterface<T> extends Store {
  get(): T;

  set(value: T): void;

  delete(): void;
}
