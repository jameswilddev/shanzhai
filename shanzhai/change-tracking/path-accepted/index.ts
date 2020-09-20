export const pathAccepted = (path: string): boolean => !/(?:^|\/)\./.test(path);
