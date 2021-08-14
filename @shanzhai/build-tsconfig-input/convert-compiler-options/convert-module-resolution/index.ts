import { ModuleResolutionKind } from "typescript";

export function convertModuleResolution(
  target: undefined | ModuleResolutionKind
): undefined | `Classic` | `Node` {
  switch (target) {
    case undefined:
      return undefined;

    case ModuleResolutionKind.Classic:
      return `Classic`;

    case ModuleResolutionKind.NodeJs:
      return `Node`;
  }
}
