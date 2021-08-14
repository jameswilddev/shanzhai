import { JsxEmit } from "typescript";
import { convertJsx } from ".";

describe(`convert-jsx`, () => {
  function maps(
    from: undefined | JsxEmit,
    to: undefined | `preserve` | `react` | `react-native`
  ): void {
    describe(`given ${from}`, () => {
      let output: undefined | `preserve` | `react` | `react-native`;

      beforeAll(() => {
        output = convertJsx(from);
      });

      it(`returns ${to}`, () => {
        expect(output).toEqual(to);
      });
    });
  }

  maps(undefined, undefined);
  maps(JsxEmit.Preserve, `preserve`);
  maps(JsxEmit.React, `react`);
  maps(JsxEmit.ReactNative, `react-native`);

  function throws(from: undefined | JsxEmit, message: string): void {
    describe(`given ${from}`, () => {
      let error: null | Error;

      beforeAll(() => {
        try {
          convertJsx(from);
          error = null;
        } catch (e) {
          error = e;
        }
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(new Error(message));
      });
    });
  }

  throws(JsxEmit.None, `Unsupported JSX mode "0".`);
  throws(JsxEmit.ReactJSX, `Unsupported JSX mode "4".`);
  throws(JsxEmit.ReactJSXDev, `Unsupported JSX mode "5".`);
});
