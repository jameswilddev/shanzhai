import { ScriptTarget } from "typescript";
import { convertTarget } from ".";

fdescribe(`convert-target`, () => {
  function maps(
    from: undefined | ScriptTarget,
    to:
      | undefined
      | `ES3`
      | `ES5`
      | `ES6`
      | `ES2015`
      | `ES2016`
      | `ES2017`
      | `ES2018`
      | `ES2019`
      | `ES2020`
      | `ESNext`
  ): void {
    describe(`given ${from}`, () => {
      let output:
        | undefined
        | `ES3`
        | `ES5`
        | `ES6`
        | `ES2015`
        | `ES2016`
        | `ES2017`
        | `ES2018`
        | `ES2019`
        | `ES2020`
        | `ESNext`;

      beforeAll(() => {
        output = convertTarget(from);
      });

      it(`returns ${to}`, () => {
        expect(output).toEqual(to);
      });
    });
  }

  maps(undefined, undefined);
  maps(ScriptTarget.ES3, `ES3`);
  maps(ScriptTarget.ES5, `ES5`);
  maps(ScriptTarget.ES2015, `ES2015`);
  maps(ScriptTarget.ES2016, `ES2016`);
  maps(ScriptTarget.ES2017, `ES2017`);
  maps(ScriptTarget.ES2018, `ES2018`);
  maps(ScriptTarget.ES2019, `ES2019`);
  maps(ScriptTarget.ES2020, `ES2020`);
  maps(ScriptTarget.ESNext, `ESNext`);
  maps(ScriptTarget.Latest, `ESNext`);

  function throws(from: undefined | ScriptTarget, message: string): void {
    describe(`given ${from}`, () => {
      let error: null | Error;

      beforeAll(() => {
        try {
          convertTarget(from);
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

  throws(ScriptTarget.ES2021, `Unsupported target "8".`);
  throws(ScriptTarget.JSON, `Unsupported target "100".`);
});
