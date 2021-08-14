export function convertLib(
  lib: undefined | ReadonlyArray<string>
):
  | undefined
  | (
      | `ES5`
      | `ES6`
      | `ES7`
      | `ES2015`
      | `ES2015.Collection`
      | `ES2015.Core`
      | `ES2015.Generator`
      | `ES2015.Iterable`
      | `ES2015.Promise`
      | `ES2015.Proxy`
      | `ES2015.Reflect`
      | `ES2015.Symbol.WellKnown`
      | `ES2015.Symbol`
      | `ES2016`
      | `ES2016.Array.Include`
      | `ES2017`
      | `ES2017.Intl`
      | `ES2017.Object`
      | `ES2017.SharedMemory`
      | `ES2017.String`
      | `ES2017.TypedArrays`
      | `ES2018`
      | `ES2018.AsyncIterable`
      | `ES2018.Intl`
      | `ES2018.Promise`
      | `ES2018.Regexp`
      | `ES2019`
      | `ES2019.Array`
      | `ES2019.Object`
      | `ES2019.String`
      | `ES2019.Symbol`
      | `ES2020`
      | `ES2020.BigInt`
      | `ES2020.Promise`
      | `ES2020.String`
      | `ES2020.Symbol.WellKnown`
      | `ESNext`
      | `ESNext.Array`
      | `ESNext.AsyncIterable`
      | `ESNext.BigInt`
      | `ESNext.Intl`
      | `ESNext.Symbol`
      | `DOM`
      | `DOM.Iterable`
      | `ScriptHost`
      | `WebWorker`
      | `WebWorker.ImportScripts`
    )[] {
  if (lib === undefined) {
    return undefined;
  } else {
    const output:
      | undefined
      | (
          | `ES5`
          | `ES6`
          | `ES7`
          | `ES2015`
          | `ES2015.Collection`
          | `ES2015.Core`
          | `ES2015.Generator`
          | `ES2015.Iterable`
          | `ES2015.Promise`
          | `ES2015.Proxy`
          | `ES2015.Reflect`
          | `ES2015.Symbol.WellKnown`
          | `ES2015.Symbol`
          | `ES2016`
          | `ES2016.Array.Include`
          | `ES2017`
          | `ES2017.Intl`
          | `ES2017.Object`
          | `ES2017.SharedMemory`
          | `ES2017.String`
          | `ES2017.TypedArrays`
          | `ES2018`
          | `ES2018.AsyncIterable`
          | `ES2018.Intl`
          | `ES2018.Promise`
          | `ES2018.Regexp`
          | `ES2019`
          | `ES2019.Array`
          | `ES2019.Object`
          | `ES2019.String`
          | `ES2019.Symbol`
          | `ES2020`
          | `ES2020.BigInt`
          | `ES2020.Promise`
          | `ES2020.String`
          | `ES2020.Symbol.WellKnown`
          | `ESNext`
          | `ESNext.Array`
          | `ESNext.AsyncIterable`
          | `ESNext.BigInt`
          | `ESNext.Intl`
          | `ESNext.Symbol`
          | `DOM`
          | `DOM.Iterable`
          | `ScriptHost`
          | `WebWorker`
          | `WebWorker.ImportScripts`
        )[] = [];

    for (const libItem of lib) {
      switch (libItem) {
        case `ES5`:
        case `ES6`:
        case `ES7`:
        case `ES2015`:
        case `ES2015.Collection`:
        case `ES2015.Core`:
        case `ES2015.Generator`:
        case `ES2015.Iterable`:
        case `ES2015.Promise`:
        case `ES2015.Proxy`:
        case `ES2015.Reflect`:
        case `ES2015.Symbol.WellKnown`:
        case `ES2015.Symbol`:
        case `ES2016`:
        case `ES2016.Array.Include`:
        case `ES2017`:
        case `ES2017.Intl`:
        case `ES2017.Object`:
        case `ES2017.SharedMemory`:
        case `ES2017.String`:
        case `ES2017.TypedArrays`:
        case `ES2018`:
        case `ES2018.AsyncIterable`:
        case `ES2018.Intl`:
        case `ES2018.Promise`:
        case `ES2018.Regexp`:
        case `ES2019`:
        case `ES2019.Array`:
        case `ES2019.Object`:
        case `ES2019.String`:
        case `ES2019.Symbol`:
        case `ES2020`:
        case `ES2020.BigInt`:
        case `ES2020.Promise`:
        case `ES2020.String`:
        case `ES2020.Symbol.WellKnown`:
        case `ESNext`:
        case `ESNext.Array`:
        case `ESNext.AsyncIterable`:
        case `ESNext.BigInt`:
        case `ESNext.Intl`:
        case `ESNext.Symbol`:
        case `DOM`:
        case `DOM.Iterable`:
        case `ScriptHost`:
        case `WebWorker`:
        case `WebWorker.ImportScripts`:
          output.push(libItem);
          break;

        default:
          throw new Error(`Unsupported lib "${libItem}".`);
      }
    }

    return output;
  }
}
