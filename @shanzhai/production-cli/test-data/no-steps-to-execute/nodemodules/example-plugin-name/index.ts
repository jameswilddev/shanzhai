import { Step } from "@shanzhai/interfaces";

module.exports = {
  triggers: [
    {
      type: `file`,
      glob: `*.example-extension`,
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
