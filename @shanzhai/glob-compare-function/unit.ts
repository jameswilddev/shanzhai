import { globCompareFunction } from ".";

// Based upon https://stackoverflow.com/a/6274381/8816561.
function shuffled<T>(items: ReadonlyArray<T>): T[] {
  const array = [...items];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

describe(`globCompareFunction`, () => {
  let expected: ReadonlyArray<string>;
  let actual: ReadonlyArray<string>;

  beforeAll(() => {
    expected = [
      `file.path`,
      `some/file.path`,
      `some-file.*`,
      `**/some-file.path`,
      `**/*.some-file-path`,
      `**/*.*`,
    ];

    actual = shuffled(expected).sort(globCompareFunction);
  });

  it(`sorts globs as expected`, () => {
    expect(actual).toEqual(expected);
  });
});
