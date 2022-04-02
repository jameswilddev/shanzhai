import { Step } from "@shanzhai/interfaces";
import { CreateDirectoryStep } from "@shanzhai/create-directory-step";
import { SerialStep } from "@shanzhai/serial-step";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { WriteFileStep } from "@shanzhai/write-file-step";
import { UnkeyedStoreGetInput } from "@shanzhai/unkeyed-store-get-input";
import { UnkeyedStoreSetOutput } from "@shanzhai/unkeyed-store-set-output";
import { EphemeralUnkeyedStore } from "@shanzhai/ephemeral-unkeyed-store";

const store = new EphemeralUnkeyedStore<string>(`Example Value Store`);

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
      down(path: string): Step {
        path;

        throw new Error(`Unexpected call to "down".`);
      },
      up(path: string): Step {
        return new SerialStep(`Example Serial Step`, [
          new ReadTextFileStep([`src`, path], new UnkeyedStoreSetOutput(store)),
          new WriteFileStep(
            `Write File`,
            [`dist`, path],
            new UnkeyedStoreGetInput(store)
          ),
        ]);
      },
    },
  ],
};
