import { ScriptTarget } from "typescript";

export function convertTarget(
  target: undefined | ScriptTarget
):
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
  | `ESNext` {
  switch (target) {
    case undefined:
      return undefined;

    case ScriptTarget.ES3:
      return `ES3`;

    case ScriptTarget.ES5:
      return `ES5`;

    case ScriptTarget.ES2015:
      return `ES2015`;

    case ScriptTarget.ES2016:
      return `ES2016`;

    case ScriptTarget.ES2017:
      return `ES2017`;

    case ScriptTarget.ES2018:
      return `ES2018`;

    case ScriptTarget.ES2019:
      return `ES2019`;

    case ScriptTarget.ES2020:
      return `ES2020`;

    case ScriptTarget.ESNext:
      return `ESNext`;

    default:
      throw new Error(`Unsupported target "${target}".`);
  }
}
