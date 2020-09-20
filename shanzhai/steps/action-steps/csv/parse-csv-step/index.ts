import { Input, Output, ActionStep } from "@shanzhai/interfaces";
import { RawCsv } from "../raw-csv";

export class ParseCsvStep extends ActionStep {
  constructor(
    name: string,
    public readonly input: Input<string>,
    public readonly output: Output<RawCsv>
  ) {
    super(name);
  }

  async execute(): Promise<void> {
    const output: string[][] = [];

    let state:
      | `nothingOnLine`
      | `nothingInColumn`
      | `unquotedColumn`
      | `quotedColumn`
      | `quotedColumnOneQuote`
      | `afterQuotedColumn` = `nothingOnLine`;

    const lastLine = (): string[] => output[output.length - 1];

    const appendLastColumn = (character: string): void => {
      const line = lastLine();
      line[line.length - 1] += character;
    };

    for (const character of this.input.get()) {
      switch (state) {
        case `nothingOnLine`:
          switch (character) {
            case `\n`:
              break;

            case `,`:
              state = `nothingInColumn`;
              output.push([``, ``]);
              break;

            case `"`:
              state = `quotedColumn`;
              output.push([``]);
              break;

            default:
              if (/\S/.test(character)) {
                state = `unquotedColumn`;
                output.push([character]);
              }
              break;
          }
          break;

        case `nothingInColumn`:
          switch (character) {
            case `\n`:
              state = `nothingOnLine`;
              break;

            case `,`:
              state = `nothingInColumn`;
              lastLine().push(``);
              break;

            case `"`:
              state = `quotedColumn`;
              break;

            default:
              if (/\S/.test(character)) {
                state = `unquotedColumn`;
                appendLastColumn(character);
              }
              break;
          }
          break;

        case `unquotedColumn`:
          switch (character) {
            case `\n`:
              state = `nothingOnLine`;
              break;

            case `,`:
              state = `nothingInColumn`;
              lastLine().push(``);
              break;

            default:
              appendLastColumn(character);
          }
          break;

        case `quotedColumn`:
          if (character === `"`) {
            state = `quotedColumnOneQuote`;
          } else {
            appendLastColumn(character);
          }
          break;

        case `quotedColumnOneQuote`:
          switch (character) {
            case `"`:
              state = `quotedColumn`;
              appendLastColumn(character);
              break;

            case `\n`:
              state = `nothingOnLine`;
              break;

            case `,`:
              state = `nothingInColumn`;
              lastLine().push(``);
              break;

            default:
              if (/\s/.test(character)) {
                state = `afterQuotedColumn`;
              } else {
                throw new Error(
                  `Unexpected character ${JSON.stringify(
                    character
                  )} following closing quote.`
                );
              }
          }
          break;

        case `afterQuotedColumn`:
          switch (character) {
            case `,`:
              state = `nothingInColumn`;
              lastLine().push(``);
              break;

            case `\n`:
              state = `nothingOnLine`;
              break;

            default:
              if (/\S/.test(character)) {
                throw new Error(
                  `Unexpected character ${JSON.stringify(
                    character
                  )} following closing quote.`
                );
              }
          }
          break;
      }
    }

    if (state === `quotedColumn`) {
      throw new Error(`Unterminated quoted column.`);
    }

    let mostColumns = 0;

    for (const row of output) {
      mostColumns = Math.max(row.length, mostColumns);
    }

    for (const row of output) {
      while (row.length < mostColumns) {
        row.push(``);
      }
    }

    this.output.set(output);
  }
}
