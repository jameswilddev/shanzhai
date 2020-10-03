import { Diff } from "@shanzhai/interfaces";

export const filterDiff = <TInput, TFilterBy extends string>(
  diff: Diff<TInput>,
  filterOptions: ReadonlyArray<TFilterBy>,
  callback: (input: TInput) => string
): {
  readonly diffs: { readonly [filteredBy in TFilterBy]: Diff<TInput> };
  readonly errors: ReadonlyArray<TInput>;
} => {
  const filtered: {
    [filteredBy: string]: {
      readonly added: TInput[];
      readonly changed: TInput[];
      readonly deleted: TInput[];
      readonly unchanged: TInput[];
    };
  } = {};

  for (const filterOption of filterOptions) {
    filtered[filterOption] = {
      added: [],
      changed: [],
      deleted: [],
      unchanged: [],
    };
  }

  const errors: TInput[] = [];

  const diffKeys: readonly ["added", "changed", "deleted", "unchanged"] = [
    `added`,
    `changed`,
    `deleted`,
    `unchanged`,
  ];

  const filterOptionsString: ReadonlyArray<string> = filterOptions;

  for (const key of diffKeys) {
    for (const input of diff[key]) {
      const filterBy = callback(input);

      if (filterOptionsString.includes(filterBy)) {
        filtered[filterBy][key].push(input);
      } else {
        if (key === `added`) {
          errors.push(input);
        }
      }
    }
  }

  return {
    diffs: (filtered as unknown) as {
      readonly [filteredBy in TFilterBy]: Diff<TInput>;
    },
    errors,
  };
};
