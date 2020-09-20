import { RawCsv } from "../raw-csv";
import { Input, Output, ActionStep, Json } from "@shanzhai/interfaces";
import { KeyedJson } from "../../json/convert-json-to-type-script-step";

export class ConvertCsvToJsonStep extends ActionStep {
  constructor(
    name: string,
    public readonly keyPrefix: string,
    public readonly input: Input<RawCsv>,
    public readonly output: Output<KeyedJson>
  ) {
    super(name);
  }

  async execute(): Promise<void> {
    const input = this.input.get();

    if (input.length < 1) {
      throw new Error(`The file contains no rows.`);
    }

    const headerRow = input[0];

    const populatedHeaders = headerRow.filter((header) => header !== ``);

    if (populatedHeaders.length === 0) {
      throw new Error(`The file contains no columns.`);
    }

    const invalidColumnNames = populatedHeaders.filter(
      (header) => !/^[a-zA-Z_0-9$]+$/.test(header)
    );

    if (invalidColumnNames.length > 0) {
      throw new Error(
        `Column ${JSON.stringify(invalidColumnNames[0])} is invalidly named.`
      );
    }

    const duplicateColumnNames = populatedHeaders.filter(
      (header) =>
        populatedHeaders.indexOf(header) !==
        populatedHeaders.lastIndexOf(header)
    );

    if (duplicateColumnNames.length > 0) {
      throw new Error(
        `Column ${JSON.stringify(duplicateColumnNames[0])} is not unique.`
      );
    }

    const output: { [key: string]: ReadonlyArray<Json> } = {};

    for (let column = 0; column < headerRow.length; column++) {
      const header = headerRow[column];

      if (header === ``) {
        if (
          input
            .slice(1)
            .map((row) => row[column])
            .some((cell) => cell !== ``)
        ) {
          throw new Error(`The file contains a column without a header.`);
        }
      } else {
        const items: Json[] = [];

        for (const row of input.slice(1)) {
          const cell = row[column];
          let converted: Json;

          try {
            converted = JSON.parse(cell);
          } catch {
            converted = cell;
          }

          items.push(converted);
        }

        output[`${this.keyPrefix}${header}`] = items;
      }
    }

    this.output.set(output);
  }
}
