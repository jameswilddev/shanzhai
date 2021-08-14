import { NewLineKind } from "typescript";

export function convertNewLine(
  newLine: undefined | NewLineKind
): undefined | `crlf` | `lf` {
  switch (newLine) {
    case undefined:
      return undefined;

    case NewLineKind.CarriageReturnLineFeed:
      return `crlf`;

    case NewLineKind.LineFeed:
      return `lf`;
  }
}
