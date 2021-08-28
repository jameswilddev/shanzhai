/**
 * Determines whether a given file path appears to be a temporary or system
 * file.
 * @param path A {@link String} containing a file path to check.
 * @returns    False when the given {@link path} appears to describe a temporary
 *             or system file, otherwise, true.
 */
export const pathAccepted = (path: string): boolean => !/(?:^|\/)\./.test(path);
