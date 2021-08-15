import { convertLib } from ".";

describe(`convert-lib`, () => {
  function maps(
    from: undefined | ReadonlyArray<string>,
    to:
      | undefined
      | ReadonlyArray<
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
        >
  ): void {
    describe(`given ${from}`, () => {
      let output:
        | undefined
        | ReadonlyArray<
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
          >;

      beforeAll(() => {
        output = convertLib(from);
      });

      it(`returns the input`, () => {
        expect(output).toEqual(to);
      });
    });
  }

  maps(undefined, undefined);
  maps([], []);
  maps(
    [
      `ES5`,
      `ES6`,
      `ES7`,
      `ES2015`,
      `ES2015.Collection`,
      `ES2015.Core`,
      `ES2015.Generator`,
      `ES2015.Iterable`,
      `ES2019.String`,
      `ES2019.Symbol`,
      `ES2020`,
      `ES2020.BigInt`,
      `ES2020.Promise`,
      `ES2020.String`,
      `ES2020.Symbol.WellKnown`,
      `esNExt`,
      `ESNext.Array`,
      `ESNext.AsyncIterable`,
      `ESNext.BigInt`,
      `ESNext.Intl`,
      `ESNext.Symbol`,
      `DOM`,
      `DOM.Iterable`,
      `ScriptHost`,
      `WebWorker`,
      `WebWorker.ImportScripts`,
      `ES2015.Promise`,
      `ES2015.Proxy`,
      `ES2015.Reflect`,
      `ES2015.Symbol.WELLKNOWN`,
      `ES2015.Symbol`,
      `ES2016`,
      `ES2016.Array.include`,
      `ES2017`,
      `ES2017.Intl`,
      `ES2017.Object`,
      `ES2017.SharedMemory`,
      `ES2017.String`,
      `ES2017.TypedArrays`,
      `ES2018`,
      `ES2018.AsyncIterable`,
      `ES2018.Intl`,
      `ES2018.Promise`,
      `ES2018.Regexp`,
      `es2019`,
      `ES2019.Array`,
      `ES2019.Object`,
    ],
    [
      `ES5`,
      `ES6`,
      `ES7`,
      `ES2015`,
      `ES2015.Collection`,
      `ES2015.Core`,
      `ES2015.Generator`,
      `ES2015.Iterable`,
      `ES2019.String`,
      `ES2019.Symbol`,
      `ES2020`,
      `ES2020.BigInt`,
      `ES2020.Promise`,
      `ES2020.String`,
      `ES2020.Symbol.WellKnown`,
      `ESNext`,
      `ESNext.Array`,
      `ESNext.AsyncIterable`,
      `ESNext.BigInt`,
      `ESNext.Intl`,
      `ESNext.Symbol`,
      `DOM`,
      `DOM.Iterable`,
      `ScriptHost`,
      `WebWorker`,
      `WebWorker.ImportScripts`,
      `ES2015.Promise`,
      `ES2015.Proxy`,
      `ES2015.Reflect`,
      `ES2015.Symbol.WellKnown`,
      `ES2015.Symbol`,
      `ES2016`,
      `ES2016.Array.Include`,
      `ES2017`,
      `ES2017.Intl`,
      `ES2017.Object`,
      `ES2017.SharedMemory`,
      `ES2017.String`,
      `ES2017.TypedArrays`,
      `ES2018`,
      `ES2018.AsyncIterable`,
      `ES2018.Intl`,
      `ES2018.Promise`,
      `ES2018.Regexp`,
      `ES2019`,
      `ES2019.Array`,
      `ES2019.Object`,
    ]
  );

  function throws(
    from: undefined | ReadonlyArray<string>,
    message: string
  ): void {
    describe(`given ${from}`, () => {
      let error: null | Error;

      beforeAll(() => {
        try {
          convertLib(from);
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

  throws(
    [
      `ES5`,
      `ES6`,
      `ES7`,
      `ES2015`,
      `ES2015.Collection`,
      `ES2015.Core`,
      `ES2015.Generator`,
      `ES2015.Iterable`,
      `ES2019.String`,
      `ES2019.Symbol`,
      `ES2020`,
      `ES2020.BigInt`,
      `ES2020.Promise`,
      `ES2020.String`,
      `ES2020.Symbol.WellKnown`,
      `esNExt`,
      `ESNext.Array`,
      `ESNext.AsyncIterable`,
      `ESNext.BigInt`,
      `ESNext.Intl`,
      `ESNext.Symbol`,
      `DOM`,
      `DOM.Iterable`,
      `ScriptHost`,
      `WebWorker`,
      `WebWorker.ImportScripts`,
      `Test Unknown Lib`,
      `ES2015.Promise`,
      `ES2015.Proxy`,
      `ES2015.Reflect`,
      `ES2015.Symbol.WellKnown`,
      `ES2015.Symbol`,
      `ES2016`,
      `ES2016.Array.Include`,
      `ES2017`,
      `ES2017.Intl`,
      `ES2017.Object`,
      `ES2017.SharedMemory`,
      `ES2017.String`,
      `ES2017.TypedArrays`,
      `ES2018`,
      `ES2018.AsyncIterable`,
      `ES2018.Intl`,
      `ES2018.Promise`,
      `ES2018.Regexp`,
      `es2019`,
      `ES2019.Array`,
      `ES2019.Object`,
    ],
    `Unsupported lib "Test Unknown Lib".`
  );
});
