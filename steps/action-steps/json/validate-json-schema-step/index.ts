import * as jsonschema from "jsonschema";
import { ActionStep } from "../../action-step";
import { Input } from "../../../inputs/input";
import { Output } from "../../../outputs/output";
import { Json } from "../../../../json";

export class ValidateJsonSchemaStep<T extends Json> extends ActionStep {
  constructor(
    name: string,
    public readonly schema: jsonschema.Schema,
    public readonly input: Input<Json>,
    public readonly output: Output<T>
  ) {
    super(name);
  }

  async execute(): Promise<void> {
    const input = this.input.get();

    const result = jsonschema.validate(input, this.schema);

    if (result.valid) {
      this.output.set(input as T);
    } else {
      throw new Error(
        `JSON schema validation failed:${result.errors
          .map((error) => `\n\t${error.property} - ${error.message}`)
          .join(``)}`
      );
    }
  }
}
