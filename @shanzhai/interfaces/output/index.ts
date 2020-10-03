import { Effect } from "../effect";

export interface Output<T> {
  set(value: T): Promise<void>;

  readonly effects: ReadonlyArray<Effect>;
}
