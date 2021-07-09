import { Diff } from "@shanzhai/interfaces";
import { filterDiff } from "..";

describe(`filterDiff`, () => {
  type TestItem =
    | `Test Added A`
    | `Test Added B`
    | `Test Added C`
    | `Test Added D`
    | `Test Added E`
    | `Test Changed A`
    | `Test Changed B`
    | `Test Changed C`
    | `Test Changed D`
    | `Test Unchanged A`
    | `Test Unchanged B`
    | `Test Deleted A`
    | `Test Deleted B`
    | `Test Deleted C`;

  let callback: jasmine.Spy;
  let output: Diff<TestItem>;

  beforeAll(() => {
    callback = jasmine.createSpy(`callback`).and.callFake((input) => {
      switch (input) {
        case `Test Added A`:
          return true;

        case `Test Added B`:
          return false;

        case `Test Added C`:
          return false;

        case `Test Added D`:
          return true;

        case `Test Added E`:
          return true;

        case `Test Changed A`:
          return true;

        case `Test Changed B`:
          return false;

        case `Test Changed C`:
          return true;

        case `Test Changed D`:
          return false;

        case `Test Unchanged A`:
          return null;

        case `Test Unchanged B`:
          return true;

        case `Test Deleted A`:
          return true;

        case `Test Deleted B`:
          return null;

        case `Test Deleted C`:
          return true;

        default:
          throw new Error(`Unexpected input "${input}".`);
      }
    });

    const diff: Diff<TestItem> = {
      added: [
        `Test Added A`,
        `Test Added B`,
        `Test Added C`,
        `Test Added D`,
        `Test Added E`,
      ],
      changed: [
        `Test Changed A`,
        `Test Changed B`,
        `Test Changed C`,
        `Test Changed D`,
      ],
      unchanged: [`Test Unchanged A`, `Test Unchanged B`],
      deleted: [`Test Deleted A`, `Test Deleted B`, `Test Deleted C`],
    };

    output = filterDiff(diff, callback);
  });

  it(`executes the callback for every added item`, () => {
    expect(callback).toHaveBeenCalledWith(`Test Added A`);
    expect(callback).toHaveBeenCalledWith(`Test Added B`);
    expect(callback).toHaveBeenCalledWith(`Test Added C`);
    expect(callback).toHaveBeenCalledWith(`Test Added D`);
    expect(callback).toHaveBeenCalledWith(`Test Added E`);
  });

  it(`executes the callback for every changed item`, () => {
    expect(callback).toHaveBeenCalledWith(`Test Changed A`);
    expect(callback).toHaveBeenCalledWith(`Test Changed B`);
    expect(callback).toHaveBeenCalledWith(`Test Changed C`);
    expect(callback).toHaveBeenCalledWith(`Test Changed D`);
  });

  it(`executes the callback for every deleted item`, () => {
    expect(callback).toHaveBeenCalledWith(`Test Deleted A`);
    expect(callback).toHaveBeenCalledWith(`Test Deleted B`);
    expect(callback).toHaveBeenCalledWith(`Test Deleted C`);
  });

  it(`executes the callback for every unchanged item`, () => {
    expect(callback).toHaveBeenCalledWith(`Test Unchanged A`);
    expect(callback).toHaveBeenCalledWith(`Test Unchanged B`);
  });

  it(`does not execute the callback again`, () => {
    expect(callback).toHaveBeenCalledTimes(14);
  });

  it(`returns the expected diff`, () => {
    expect(output).toEqual({
      added: [`Test Added A`, `Test Added D`, `Test Added E`],
      changed: [`Test Changed A`, `Test Changed C`],
      unchanged: [`Test Unchanged B`],
      deleted: [`Test Deleted A`, `Test Deleted C`],
    });
  });
});
