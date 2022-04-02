import { Step } from "@shanzhai/interfaces";

module.exports = {
  triggers: [
    {
      type: `fileExtension`,
      extension: `example-extension`,
      down(path: string): Step {
        path;

        throw new Error(`Unexpected call to "down".`);
      },
      up(path: string): Step {
        path;

        throw new Error(`Unexpected call to "up".`);
      },
    },
  ],
};
