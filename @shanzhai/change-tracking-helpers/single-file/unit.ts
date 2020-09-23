import { singleFile } from ".";

describe(`singleFile`, () => {
  type TestValue = `Test Value A` | `Test Value B` | `Test Value C`;

  type Event =
    | {
        readonly type: `trigger`;
        readonly value: TestValue;
      }
    | {
        readonly type: `resolve`;
        readonly index: number;
      }
    | {
        readonly type: `reject`;
        readonly index: number;
        readonly error: Error;
      };

  const scenario = (
    events: ReadonlyArray<Event>,
    executions: number,
    mostRecentExecution: null | TestValue,
    successes: number,
    errors: number,
    mostRecentError: null | Error
  ): void => {
    const descriptionComponents: string[] = [];

    for (const event of events) {
      switch (event.type) {
        case `trigger`:
          descriptionComponents.push(`triggering an event`);
          break;

        case `resolve`:
          descriptionComponents.push(`succeeding`);
          break;

        case `reject`:
          descriptionComponents.push(`failing`);
          break;
      }
    }

    describe(`when ${descriptionComponents.join(`, then `)}`, () => {
      let execute: jasmine.Spy;
      let onSuccess: jasmine.Spy;
      let onError: jasmine.Spy;

      beforeAll(async () => {
        const promises: { resolve(): void; reject(reason: Error): void }[] = [];

        execute = jasmine.createSpy(`execute`).and.callFake(() => {
          return new Promise((resolve, reject) => {
            promises.push({ resolve, reject });
          });
        });
        onSuccess = jasmine.createSpy(`onSuccess`);
        onError = jasmine.createSpy(`onError`);

        const result = singleFile(execute, onSuccess, onError);

        for (const event of events) {
          switch (event.type) {
            case `trigger`:
              result(event.value);
              break;

            case `resolve`:
              promises[event.index].resolve();
              break;

            case `reject`:
              promises[event.index].reject(event.error);
              break;
          }

          await new Promise((resolve) => setTimeout(resolve, 10));
        }
      });

      it(`executes the expected number of times`, () => {
        expect(execute).toHaveBeenCalledTimes(executions);
      });

      if (mostRecentExecution !== null) {
        it(`executes using the expected value`, () => {
          expect(execute).toHaveBeenCalledWith(mostRecentExecution);
        });
      }

      it(`reports the expected number of successes`, () => {
        expect(onSuccess).toHaveBeenCalledTimes(successes);
      });

      it(`reports the expected number of errors`, () => {
        expect(onError).toHaveBeenCalledTimes(errors);
      });

      if (mostRecentError !== null) {
        it(`reports the expected error`, () => {
          expect(onError).toHaveBeenCalledWith(mostRecentError);
        });
      }
    });
  };

  scenario([], 0, null, 0, 0, null);

  scenario(
    [{ type: `trigger`, value: `Test Value A` }],
    1,
    `Test Value A`,
    0,
    0,
    null
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `resolve`, index: 0 },
    ],
    1,
    null,
    1,
    0,
    null
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `reject`, index: 0, error: new Error(`Test Error A`) },
    ],
    1,
    null,
    0,
    1,
    new Error(`Test Error A`)
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `trigger`, value: `Test Value B` },
    ],
    1,
    null,
    0,
    0,
    null
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `trigger`, value: `Test Value B` },
      { type: `resolve`, index: 0 },
    ],
    2,
    `Test Value B`,
    1,
    0,
    null
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `trigger`, value: `Test Value B` },
      { type: `resolve`, index: 0 },
      { type: `resolve`, index: 1 },
    ],
    2,
    null,
    2,
    0,
    null
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `trigger`, value: `Test Value B` },
      { type: `resolve`, index: 0 },
      { type: `reject`, index: 1, error: new Error(`Test Error B`) },
    ],
    2,
    null,
    1,
    1,
    new Error(`Test Error B`)
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `trigger`, value: `Test Value B` },
      { type: `reject`, index: 0, error: new Error(`Test Error A`) },
    ],
    2,
    `Test Value B`,
    0,
    1,
    new Error(`Test Error A`)
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `trigger`, value: `Test Value B` },
      { type: `reject`, index: 0, error: new Error(`Test Error A`) },
      { type: `resolve`, index: 1 },
    ],
    2,
    null,
    1,
    1,
    null
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `trigger`, value: `Test Value B` },
      { type: `reject`, index: 0, error: new Error(`Test Error A`) },
      { type: `reject`, index: 1, error: new Error(`Test Error B`) },
    ],
    2,
    null,
    0,
    2,
    new Error(`Test Error B`)
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `trigger`, value: `Test Value B` },
      { type: `trigger`, value: `Test Value C` },
    ],
    1,
    null,
    0,
    0,
    null
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `trigger`, value: `Test Value B` },
      { type: `trigger`, value: `Test Value C` },
      { type: `resolve`, index: 0 },
    ],
    2,
    `Test Value C`,
    1,
    0,
    null
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `trigger`, value: `Test Value B` },
      { type: `trigger`, value: `Test Value C` },
      { type: `resolve`, index: 0 },
      { type: `resolve`, index: 1 },
    ],
    2,
    null,
    2,
    0,
    null
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `trigger`, value: `Test Value B` },
      { type: `trigger`, value: `Test Value C` },
      { type: `resolve`, index: 0 },
      { type: `reject`, index: 1, error: new Error(`Test Error B`) },
    ],
    2,
    null,
    1,
    1,
    new Error(`Test Error B`)
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `trigger`, value: `Test Value B` },
      { type: `trigger`, value: `Test Value C` },
      { type: `reject`, index: 0, error: new Error(`Test Error A`) },
    ],
    2,
    `Test Value C`,
    0,
    1,
    new Error(`Test Error A`)
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `trigger`, value: `Test Value B` },
      { type: `trigger`, value: `Test Value C` },
      { type: `reject`, index: 0, error: new Error(`Test Error A`) },
      { type: `resolve`, index: 1 },
    ],
    2,
    null,
    1,
    1,
    null
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `trigger`, value: `Test Value B` },
      { type: `trigger`, value: `Test Value C` },
      { type: `reject`, index: 0, error: new Error(`Test Error A`) },
      { type: `reject`, index: 1, error: new Error(`Test Error B`) },
    ],
    2,
    null,
    0,
    2,
    new Error(`Test Error B`)
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `resolve`, index: 0 },
      { type: `trigger`, value: `Test Value B` },
    ],
    2,
    `Test Value B`,
    1,
    0,
    null
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `resolve`, index: 0 },
      { type: `trigger`, value: `Test Value B` },
      { type: `resolve`, index: 1 },
    ],
    2,
    null,
    2,
    0,
    null
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `resolve`, index: 0 },
      { type: `trigger`, value: `Test Value B` },
      { type: `reject`, index: 1, error: new Error(`Test Error B`) },
    ],
    2,
    null,
    1,
    1,
    new Error(`Test Error B`)
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `reject`, index: 0, error: new Error(`Test Error A`) },
      { type: `trigger`, value: `Test Value B` },
    ],
    2,
    `Test Value B`,
    0,
    1,
    null
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `reject`, index: 0, error: new Error(`Test Error A`) },
      { type: `trigger`, value: `Test Value B` },
      { type: `resolve`, index: 1 },
    ],
    2,
    null,
    1,
    1,
    null
  );

  scenario(
    [
      { type: `trigger`, value: `Test Value A` },
      { type: `reject`, index: 0, error: new Error(`Test Error A`) },
      { type: `trigger`, value: `Test Value B` },
      { type: `reject`, index: 1, error: new Error(`Test Error B`) },
    ],
    2,
    null,
    0,
    2,
    new Error(`Test Error B`)
  );
});
