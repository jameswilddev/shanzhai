export function generateMarkdownTable<
  T extends { readonly [key: string]: string }
>(
  headers: ReadonlyArray<readonly [keyof T, string]>,
  sortBy: keyof T,
  data: ReadonlyArray<T>
): string {
  const dataCopy: ReadonlyArray<string>[] = data
    .slice()
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
    .map((row) => headers.map((column) => row[column[0]]));

  dataCopy.unshift(headers.map((column) => column[1]));

  const longestOfColumn = headers.map((_, i) =>
    Math.max(...dataCopy.map((row) => row[i].length))
  );

  dataCopy.splice(
    1,
    0,
    longestOfColumn.map((length) => `-`.repeat(length))
  );

  return dataCopy
    .map((row) =>
      row.map((column, i) => column.padEnd(longestOfColumn[i], ` `)).join(` | `)
    )
    .join(`\n`);
}
