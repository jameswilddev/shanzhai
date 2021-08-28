import * as jsonschema from "jsonschema";
import { Input, Output, ActionStep, Json } from "@shanzhai/interfaces";

/**
 * An {@link ActionStep} which validates a {@link Json} value against a JSON
 * schema, raising an error should it not match.
 * @template T The which the JSON schema is ensuring the input matches.
 */
export class ValidateJsonSchemaStep<T extends Json> extends ActionStep {
  /**
   * @param name   A description of the operation being performed.
   * @param schema An {@link Input} which provides the JSON schema to validate
   *               against.
   * @param input  An {@link Input} which provides the JSON value to validate.
   * @param output An {@link Output} to which to write the {@link input} to,
   *               cast to the target type.
   */
  constructor(
    name: string,
    public readonly schema: jsonschema.Schema,
    public readonly input: Input<Json>,
    public readonly output: Output<T>
  ) {
    super(name, output.effects);
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    const input = await this.input.get();

    const result = jsonschema.validate(input, this.schema);

    if (result.valid) {
      await this.output.set(input as T);
    } else {
      throw new Error(
        `JSON schema validation failed:${result.errors
          .map((error) => `\n\t${error.property} - ${error.message}`)
          .join(``)}`
      );
    }
  }
}
