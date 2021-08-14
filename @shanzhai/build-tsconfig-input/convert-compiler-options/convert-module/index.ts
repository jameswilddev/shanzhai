import { ModuleKind } from "typescript";

export function convertModule(
  module: undefined | ModuleKind
):
  | undefined
  | `CommonJS`
  | `AMD`
  | `System`
  | `UMD`
  | `ES2015`
  | `ES2020`
  | `ESNext`
  | `None` {
  switch (module) {
    case undefined:
      return undefined;

    case ModuleKind.CommonJS:
      return `CommonJS`;

    case ModuleKind.AMD:
      return `AMD`;

    case ModuleKind.System:
      return `System`;

    case ModuleKind.UMD:
      return `UMD`;

    case ModuleKind.ES2015:
      return `ES2015`;

    case ModuleKind.ES2020:
      return `ESNext`;

    case ModuleKind.None:
      return `None`;

    default:
      throw new Error(`Unsupported module mode "${module}".`);
  }
}
