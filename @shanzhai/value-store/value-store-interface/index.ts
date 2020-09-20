export interface ValueStoreInterface<T> {
  readonly name: string;

  get(): T;

  set(value: T): void;

  delete(): void;
}
