import { generateDiff } from ".";
import { Diff } from "../diff";

describe(`generateDiff`, () => {
  let diff: Diff;
  beforeAll(() => {
    diff = generateDiff(
      {
        testChangedKeyA: 250977841,
        testChangedKeyB: 498066877,
        testUnchangedKeyC: 529788615,
        testUnchangedKeyA: 789707642,
        testDeletedKeyB: 592434368,
        testChangedKeyC: 657809196,
        testDeletedKeyA: 786761939,
        testUnchangedKeyB: 591733676,
        testDeletedKeyC: 670674224,
      },
      {
        testChangedKeyA: 419651368,
        testUnchangedKeyB: 591733676,
        testAddedKeyB: 622964471,
        testChangedKeyC: 860705509,
        testChangedKeyB: 640184614,
        testAddedKeyC: 842584506,
        testUnchangedKeyA: 789707642,
        testAddedKeyA: 152522627,
        testUnchangedKeyC: 529788615,
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
