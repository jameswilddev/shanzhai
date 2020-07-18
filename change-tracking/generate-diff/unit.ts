import { generateDiff } from ".";
import { Diff } from "../diff";

describe(`generateDiff`, () => {
  let diff: Diff;
  beforeAll(() => {
    diff = generateDiff(
      {
        testChangedKeyA: 250977841,
        testChangedKeyB: 498066877,
        testDeletedKeyB: 592434368,
        testChangedKeyC: 657809196,
        testDeletedKeyA: 786761939,
        testDeletedKeyC: 670674224,
      },
      {
        testChangedKeyA: 419651368,
        testChangedKeyB: 640184614,
        testAddedKeyB: 622964471,
        testChangedKeyC: 860705509,
        testAddedKeyA: 152522627,
        testAddedKeyC: 842584506,
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
});
