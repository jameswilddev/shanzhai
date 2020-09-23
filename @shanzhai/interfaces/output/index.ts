export interface Output<T> {
  set(value: T): Promise<void>;
}
