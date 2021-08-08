import { Step, ParsedPath } from "@shanzhai/interfaces";
import { CreateDirectoryStep } from "@shanzhai/create-directory-step";
import { SerialStep } from "@shanzhai/serial-step";
import {
  ValueStore,
  ValueStoreInput,
  ValueStoreOutput,
} from "@shanzhai/value-store";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { WriteFileStep } from "@shanzhai/write-file-step";

const store = new ValueStore<string>(`Example Value Store`);

module.exports = {
  triggers: [
    {
      type: `oneTime`,

      up(): Step {
        return new CreateDirectoryStep(`Create Dist`, [`dist`]);
      },
    },
    {
      type: `fileExtension`,
      extension: `example-extension`,
      down(path: ParsedPath): Step {
        path;

        throw new Error(`Unexpected call to "down".`);
      },
      up(path: ParsedPath): Step {
        return new SerialStep(`Example Serial Step`, [
          new ReadTextFileStep(
            [`src`, path.fullPath],
            new ValueStoreOutput(store)
          ),
          new WriteFileStep(
            `Write File`,
            [`dist`, path.fullPath],
            new ValueStoreInput(store)
          ),
        ]);
      },
    },
  ],
};
