import { JsxEmit } from "typescript";

export function convertJsx(
  jsx: undefined | JsxEmit
): undefined | `preserve` | `react` | `react-native` {
  switch (jsx) {
    case undefined:
      return undefined;

    case JsxEmit.Preserve:
      return `preserve`;

    case JsxEmit.React:
      return `react`;

    case JsxEmit.ReactNative:
      return `react-native`;

    default:
      throw new Error(`Unsupported JSX mode "${jsx}".`);
  }
}
