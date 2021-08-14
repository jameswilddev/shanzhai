import { ImportsNotUsedAsValues } from "typescript";
import { convertImportsNotUsedAsValues } from ".";

describe(`convert-imports-not-used-as-values`, () => {
  function maps(
    from: undefined | ImportsNotUsedAsValues,
    to: undefined | `remove` | `preserve` | `error`
  ): void {
    describe(`given ${from}`, () => {
      let output: undefined | `remove` | `preserve` | `error`;

      beforeAll(() => {
        output = convertImportsNotUsedAsValues(from);
      });

      it(`returns ${to}`, () => {
        expect(output).toEqual(to);
      });
    });
  }

  maps(undefined, undefined);
  maps(ImportsNotUsedAsValues.Remove, `remove`);
  maps(ImportsNotUsedAsValues.Preserve, `preserve`);
  maps(ImportsNotUsedAsValues.Error, `error`);
});
