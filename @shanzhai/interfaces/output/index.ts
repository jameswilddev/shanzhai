import { OutputEffect } from "../output-effect";

export interface Output<T> {
  set(value: T): Promise<void>;

  readonly effects: ReadonlyArray<OutputEffect>;
}
