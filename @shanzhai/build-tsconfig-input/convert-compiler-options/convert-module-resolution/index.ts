import { ModuleResolutionKind } from "typescript";

export function convertModuleResolution(
  target: undefined | ModuleResolutionKind
): undefined | `Classic` | `Node` | `Node12` | `NodeNext` {
  switch (target) {
    case undefined:
      return undefined;

    case ModuleResolutionKind.Classic:
      return `Classic`;

    case ModuleResolutionKind.NodeJs:
      return `Node`;

    case ModuleResolutionKind.Node12:
      return `Node12`;

    case ModuleResolutionKind.NodeNext:
      return `NodeNext`;
  }
}
