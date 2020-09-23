import { Output } from "@shanzhai/interfaces";

export class NullOutput<TValue> implements Output<TValue> {
  set(value: TValue): void {
    value;
  }
}
