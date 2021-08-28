import { ParsedPath } from "@shanzhai/interfaces";

const upperCaseFirstCharacter = (input: string): string =>
  `${input.slice(0, 1).toUpperCase()}${input.slice(1)}`;

const kebabCaseToPascalCase = (input: string): string =>
  input.split(`-`).map(upperCaseFirstCharacter).join(``);

const kebabCaseToCamelCase = (input: string): string => {
  const pascalCase = kebabCaseToPascalCase(input);
  return `${pascalCase.slice(0, 1).toLowerCase()}${pascalCase.slice(1)}`;
};

/**
 * Attempts to parse a {@link String} containing a file path to a
 * {@link ParsedPath}.
 * @param input The file path to parse.
 * @returns     The corresponding {@link ParsedPath}, or, null should the given
 *              {@link input} not be parsable.
 */
export const parsePath = (input: string): null | ParsedPath => {
  const match =
    /^((?:[a-z0-9$][a-z0-9-$]*[a-z0-9$]|[a-z0-9$])(?:\/(?:[a-z0-9$][a-z0-9-$]*[a-z0-9$]|[a-z0-9$]))*)\.([^.]+)$/.exec(
      input
    );

  if (match === null) {
    return null;
  } else {
    const fullPathWithoutExtension = match[1];
    const fragments = fullPathWithoutExtension.split(`/`);
    const fileExtension = match[2];

    const typeScriptName = fragments.map(kebabCaseToCamelCase).join(`_`);

    return {
      typeScriptName,
      fullPath: input,
      fileExtension,
      fullPathWithoutExtension,
    };
  }
};
