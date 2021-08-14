import { NewLineKind } from "typescript";
import { convertNewLine } from ".";

describe(`convert-new-line`, () => {
  function maps(
    from: undefined | NewLineKind,
    to: undefined | `crlf` | `lf`
  ): void {
    describe(`given ${from}`, () => {
      let output: undefined | `crlf` | `lf`;

      beforeAll(() => {
        output = convertNewLine(from);
      });

      it(`returns ${to}`, () => {
        expect(output).toEqual(to);
      });
    });
  }

  maps(undefined, undefined);
  maps(NewLineKind.CarriageReturnLineFeed, `crlf`);
  maps(NewLineKind.LineFeed, `lf`);
});
