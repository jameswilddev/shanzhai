export function generateReadmeBadges(name: ReadonlyArray<string>): string {
  return [
    `[![npm](https://img.shields.io/npm/v/${name.join(
      `/`
    )}.svg)](https://www.npmjs.com/package/${name.join(`/`)})`,
    `[![npm type definitions](https://img.shields.io/npm/types/${name.join(
      `/`
    )}.svg)](https://www.npmjs.com/package/${name.join(`/`)})`,
  ].join(` `);
}
