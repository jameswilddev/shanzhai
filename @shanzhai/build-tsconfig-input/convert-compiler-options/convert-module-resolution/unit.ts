import { ModuleResolutionKind } from "typescript";
import { convertModuleResolution } from ".";

describe(`convert-module-resolution`, () => {
  function maps(
    from: undefined | ModuleResolutionKind,
    to: undefined | `Classic` | `Node` | `Node12` | `NodeNext`
  ): void {
    describe(`given ${from}`, () => {
      let output: undefined | `Classic` | `Node` | `Node12` | `NodeNext`;

      beforeAll(() => {
        output = convertModuleResolution(from);
      });

      it(`returns ${to}`, () => {
        expect(output).toEqual(to);
      });
    });
  }

  maps(undefined, undefined);
  maps(ModuleResolutionKind.Classic, `Classic`);
  maps(ModuleResolutionKind.NodeJs, `Node`);
  maps(ModuleResolutionKind.Node12, `Node12`);
  maps(ModuleResolutionKind.NodeNext, `NodeNext`);
});
