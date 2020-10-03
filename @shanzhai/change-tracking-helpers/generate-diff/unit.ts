import { Diff } from "@shanzhai/interfaces";
import { generateDiff } from "..";

describe(`generateDiff`, () => {
  let diff: Diff<string>;
  beforeAll(() => {
    diff = generateDiff(
      {
        testChangedKeyA: `Test Changed Value A A`,
        testChangedKeyB: `Test Changed Value B A`,
        testUnchangedKeyC: `Test Unchanged Value C`,
        testUnchangedKeyA: `Test Unchanged Value A`,
        testDeletedKeyB: `Test Deleted Value B`,
        testChangedKeyC: `Test Changed Value C A`,
        testDeletedKeyA: `Test Deleted Value A`,
        testUnchangedKeyB: `Test Unchanged Value B`,
        testDeletedKeyC: `Test Deleted Value C`,
      },
      {
        testChangedKeyA: `Test Changed Value A B`,
        testUnchangedKeyB: `Test Unchanged Value B`,
        testAddedKeyB: `Test Added Value B`,
        testChangedKeyC: `Test Changed Value C B`,
        testChangedKeyB: `Test Changed Value B B`,
        testAddedKeyC: `Test Added Value C`,
        testUnchangedKeyA: `Test Unchanged Value A`,
        testAddedKeyA: `Test Added Value A`,
        testUnchangedKeyC: `Test Unchanged Value C`,
      }
    );
  });

  it(`lists the added files`, () => {
    expect(diff.added).toEqual([
      `testAddedKeyA`,
      `testAddedKeyB`,
      `testAddedKeyC`,
    ]);
  });

  it(`lists the changed files`, () => {
    expect(diff.changed).toEqual([
      `testChangedKeyA`,
      `testChangedKeyB`,
      `testChangedKeyC`,
    ]);
  });

  it(`lists the deleted files`, () => {
    expect(diff.deleted).toEqual([
      `testDeletedKeyA`,
      `testDeletedKeyB`,
      `testDeletedKeyC`,
    ]);
  });

  it(`lists the unchanged files`, () => {
    expect(diff.unchanged).toEqual([
      `testUnchangedKeyA`,
      `testUnchangedKeyB`,
      `testUnchangedKeyC`,
    ]);
  });
});
