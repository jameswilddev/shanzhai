export interface Input<T> {
  get(): Promise<T>;
}
