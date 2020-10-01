import { Output } from "@shanzhai/interfaces";

export class NullOutput<TValue> implements Output<TValue> {
  async set(value: TValue): Promise<void> {
    value;
  }
}
