import { Diff, filterDiff } from "..";

describe(`filterDiff`, () => {
  type TestInput =
    | `Test Input Added A`
    | `Test Input Added B`
    | `Test Input Added C`
    | `Test Input Added D`
    | `Test Input Added E`
    | `Test Input Changed A`
    | `Test Input Changed B`
    | `Test Input Changed C`
    | `Test Input Changed D`
    | `Test Input Unchanged A`
    | `Test Input Unchanged B`
    | `Test Input Deleted A`
    | `Test Input Deleted B`
    | `Test Input Deleted C`;

  type TestFilterBy =
    | `Test Filter By A`
    | `Test Filter By B`
    | `Test Filter By C`;

  let callback: jasmine.Spy;
  let output: {
    readonly diffs: {
      readonly [filteredBy in TestFilterBy]: Diff<TestInput>;
    };
    readonly errors: ReadonlyArray<TestInput>;
  };

  beforeAll(() => {
    callback = jasmine.createSpy(`callback`).and.callFake((input) => {
      switch (input) {
        case `Test Input Added A`:
          return `Test Filter By A`;

        case `Test Input Added B`:
          return null;

        case `Test Input Added C`:
          return null;

        case `Test Input Added D`:
          return `Test Filter By C`;

        case `Test Input Added E`:
          return `Test Filter By A`;

        case `Test Input Changed A`:
          return `Test Filter By C`;

        case `Test Input Changed B`:
          return null;

        case `Test Input Changed C`:
          return `Test Filter By C`;

        case `Test Input Changed D`:
          return null;

        case `Test Input Unchanged A`:
          return null;

        case `Test Input Unchanged B`:
          return `Test Filter By A`;

        case `Test Input Deleted A`:
          return `Test Filter By A`;

        case `Test Input Deleted B`:
          return null;

        case `Test Input Deleted C`:
          return `Test Filter By C`;

        default:
          throw new Error(`Unexpected input "${input}".`);
      }
    });

    const diff: Diff<TestInput> = {
      added: [
        `Test Input Added A`,
        `Test Input Added B`,
        `Test Input Added C`,
        `Test Input Added D`,
        `Test Input Added E`,
      ],
      changed: [
        `Test Input Changed A`,
        `Test Input Changed B`,
        `Test Input Changed C`,
        `Test Input Changed D`,
      ],
      unchanged: [`Test Input Unchanged A`, `Test Input Unchanged B`],
      deleted: [
        `Test Input Deleted A`,
        `Test Input Deleted B`,
        `Test Input Deleted C`,
      ],
    };
    const filterOptions: ReadonlyArray<TestFilterBy> = [
      `Test Filter By A`,
      `Test Filter By B`,
      `Test Filter By C`,
    ];

    output = filterDiff(diff, filterOptions, callback);
  });

  it(`executes the callback for every added item`, () => {
    expect(callback).toHaveBeenCalledWith(`Test Input Added A`);
    expect(callback).toHaveBeenCalledWith(`Test Input Added B`);
    expect(callback).toHaveBeenCalledWith(`Test Input Added C`);
    expect(callback).toHaveBeenCalledWith(`Test Input Added D`);
    expect(callback).toHaveBeenCalledWith(`Test Input Added E`);
  });

  it(`executes the callback for every changed item`, () => {
    expect(callback).toHaveBeenCalledWith(`Test Input Changed A`);
    expect(callback).toHaveBeenCalledWith(`Test Input Changed B`);
    expect(callback).toHaveBeenCalledWith(`Test Input Changed C`);
    expect(callback).toHaveBeenCalledWith(`Test Input Changed D`);
  });

  it(`executes the callback for every deleted item`, () => {
    expect(callback).toHaveBeenCalledWith(`Test Input Deleted A`);
    expect(callback).toHaveBeenCalledWith(`Test Input Deleted B`);
    expect(callback).toHaveBeenCalledWith(`Test Input Deleted C`);
  });

  it(`executes the callback for every unchanged item`, () => {
    expect(callback).toHaveBeenCalledWith(`Test Input Unchanged A`);
    expect(callback).toHaveBeenCalledWith(`Test Input Unchanged B`);
  });

  it(`does not execute the callback again`, () => {
    expect(callback).toHaveBeenCalledTimes(14);
  });

  it(`returns the expected diffs`, () => {
    expect(output.diffs).toEqual({
      "Test Filter By A": {
        added: [`Test Input Added A`, `Test Input Added E`],
        changed: [],
        unchanged: [`Test Input Unchanged B`],
        deleted: [`Test Input Deleted A`],
      },
      "Test Filter By B": {
        added: [],
        changed: [],
        unchanged: [],
        deleted: [],
      },
      "Test Filter By C": {
        added: [`Test Input Added D`],
        changed: [`Test Input Changed A`, `Test Input Changed C`],
        unchanged: [],
        deleted: [`Test Input Deleted C`],
      },
    });
  });

  it(`returns the expected errors`, () => {
    expect(output.errors).toEqual([`Test Input Added B`, `Test Input Added C`]);
  });
});
