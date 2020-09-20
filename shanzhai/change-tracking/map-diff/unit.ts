import { Diff } from "../diff";
import { mapDiff } from ".";

describe(`mapDiff`, () => {
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

  type TestOutput =
    | `Test Output Added A`
    | `Test Output Added D`
    | `Test Output Added E`
    | `Test Output Changed A`
    | `Test Output Changed C`
    | `Test Output Unchanged B`
    | `Test Output Deleted A`
    | `Test Output Deleted C`;

  let callback: jasmine.Spy;
  let output: {
    readonly diff: Diff<TestOutput>;
    readonly errors: ReadonlyArray<TestInput>;
  };

  beforeAll(() => {
    callback = jasmine.createSpy(`callback`).and.callFake((input) => {
      switch (input) {
        case `Test Input Added A`:
          return `Test Output Added A`;

        case `Test Input Added B`:
          return null;

        case `Test Input Added C`:
          return null;

        case `Test Input Added D`:
          return `Test Output Added D`;

        case `Test Input Added E`:
          return `Test Output Added E`;

        case `Test Input Changed A`:
          return `Test Output Changed A`;

        case `Test Input Changed B`:
          return null;

        case `Test Input Changed C`:
          return `Test Output Changed C`;

        case `Test Input Changed D`:
          return null;

        case `Test Input Unchanged A`:
          return null;

        case `Test Input Unchanged B`:
          return `Test Output Unchanged B`;

        case `Test Input Deleted A`:
          return `Test Output Deleted A`;

        case `Test Input Deleted B`:
          return null;

        case `Test Input Deleted C`:
          return `Test Output Deleted C`;

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

    output = mapDiff(diff, callback);
  });

  it(`maps every added item`, () => {
    expect(callback).toHaveBeenCalledWith(`Test Input Added A`);
    expect(callback).toHaveBeenCalledWith(`Test Input Added B`);
    expect(callback).toHaveBeenCalledWith(`Test Input Added C`);
    expect(callback).toHaveBeenCalledWith(`Test Input Added D`);
    expect(callback).toHaveBeenCalledWith(`Test Input Added E`);
  });

  it(`maps every changed item`, () => {
    expect(callback).toHaveBeenCalledWith(`Test Input Changed A`);
    expect(callback).toHaveBeenCalledWith(`Test Input Changed B`);
    expect(callback).toHaveBeenCalledWith(`Test Input Changed C`);
    expect(callback).toHaveBeenCalledWith(`Test Input Changed D`);
  });

  it(`maps every unchanged item`, () => {
    expect(callback).toHaveBeenCalledWith(`Test Input Unchanged A`);
    expect(callback).toHaveBeenCalledWith(`Test Input Unchanged B`);
  });

  it(`maps every deleted item`, () => {
    expect(callback).toHaveBeenCalledWith(`Test Input Deleted A`);
    expect(callback).toHaveBeenCalledWith(`Test Input Deleted B`);
    expect(callback).toHaveBeenCalledWith(`Test Input Deleted C`);
  });

  it(`maps no further items`, () => {
    expect(callback).toHaveBeenCalledTimes(14);
  });

  it(`returns the mapped added items`, () => {
    expect(output.diff.added).toEqual([
      `Test Output Added A`,
      `Test Output Added D`,
      `Test Output Added E`,
    ]);
  });

  it(`returns the mapped changed items`, () => {
    expect(output.diff.changed).toEqual([
      `Test Output Changed A`,
      `Test Output Changed C`,
    ]);
  });

  it(`returns the mapped unchanged items`, () => {
    expect(output.diff.unchanged).toEqual([`Test Output Unchanged B`]);
  });

  it(`returns the mapped deleted items`, () => {
    expect(output.diff.deleted).toEqual([
      `Test Output Deleted A`,
      `Test Output Deleted C`,
    ]);
  });

  it(`returns the unmappable items`, () => {
    expect(output.errors).toEqual([`Test Input Added B`, `Test Input Added C`]);
  });
});
