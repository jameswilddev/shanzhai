import { ModuleResolutionKind } from "typescript";

export function convertModuleResolution(
  target: undefined | ModuleResolutionKind
): undefined | `Classic` | `Node` | `NodeNext` | `Node12` {
  switch (target) {
    case undefined:
      return undefined;

    case ModuleResolutionKind.Classic:
      return `Classic`;

    case ModuleResolutionKind.NodeJs:
      return `Node`;

    case ModuleResolutionKind.NodeNext:
      return `NodeNext`;

    case ModuleResolutionKind.Node12:
      return `Node12`;
  }
}
