import { ModuleKind } from "typescript";
import { convertModule } from ".";

describe(`convert-module`, () => {
  function maps(
    from: undefined | ModuleKind,
    to:
      | undefined
      | `CommonJS`
      | `AMD`
      | `System`
      | `UMD`
      | `ES2015`
      | `ES2020`
      | `ESNext`
      | `None`
  ): void {
    describe(`given ${from}`, () => {
      let output:
        | undefined
        | `CommonJS`
        | `AMD`
        | `System`
        | `UMD`
        | `ES2015`
        | `ES2020`
        | `ESNext`
        | `None`;

      beforeAll(() => {
        output = convertModule(from);
      });

      it(`returns ${to}`, () => {
        expect(output).toEqual(to);
      });
    });
  }

  maps(undefined, undefined);
  maps(ModuleKind.CommonJS, `CommonJS`);
  maps(ModuleKind.AMD, `AMD`);
  maps(ModuleKind.System, `System`);
  maps(ModuleKind.UMD, `UMD`);
  maps(ModuleKind.ES2015, `ES2015`);
  maps(ModuleKind.ES2020, `ESNext`);
  maps(ModuleKind.None, `None`);

  function throws(from: undefined | ModuleKind, message: string): void {
    describe(`given ${from}`, () => {
      let error: null | Error;

      beforeAll(() => {
        try {
          convertModule(from);
          error = null;
        } catch (e) {
          error = e as Error;
        }
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(new Error(message));
      });
    });
  }

  throws(ModuleKind.ESNext, `Unsupported module mode "99".`);
});
