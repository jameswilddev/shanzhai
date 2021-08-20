import { Step } from "@shanzhai/interfaces";
import { KeyValueStoreAllInput } from "@shanzhai/key-value-store";
import {
  DeleteFromValueStoreStep,
  ValueStoreOutput,
} from "@shanzhai/value-store";
import { SerialStep } from "@shanzhai/serial-step";
import { zipContentStore } from "@shanzhai/zip-content-store";
import { zipStore } from "@shanzhai/zip-store";
import { ZipStep } from "@shanzhai/zip-step";
import zipPlugin = require(".");

describe(`zip-plugin`, () => {
  it(`listens for changes to zip content`, () => {
    expect(zipPlugin.triggers.zip.stores).toEqual([zipContentStore]);
  });

  describe(`when SVG defs change`, () => {
    let step: Step;

    beforeAll(() => {
      step = zipPlugin.triggers.zip.invalidated();
    });

    it(`zips all content`, () => {
      expect(step).toEqual(
        new SerialStep(`Zip`, [
          new DeleteFromValueStoreStep(zipStore),
          new ZipStep(
            `Zip`,
            new KeyValueStoreAllInput(zipContentStore),
            new ValueStoreOutput(zipStore)
          ),
        ])
      );
    });
  });
});
