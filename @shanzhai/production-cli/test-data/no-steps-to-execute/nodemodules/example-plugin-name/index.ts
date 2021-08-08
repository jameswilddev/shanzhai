import { Step, ParsedPath } from "@shanzhai/interfaces";

module.exports = {
  triggers: [
    {
      type: `fileExtension`,
      extension: `example-extension`,
      down(path: ParsedPath): Step {
        path;

        throw new Error(`Unexpected call to "down".`);
      },
      up(path: ParsedPath): Step {
        path;

        throw new Error(`Unexpected call to "up".`);
      },
    },
  ],
};
