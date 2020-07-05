import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { Output } from "../../../outputs/output";
import { ReadBinaryFileStep } from ".";

describe(`ReadBinaryFileStep`, () => {
  describe(`on construction`, () => {
    let root: string;
    let outputSet: jasmine.Spy;
    let output: Output<Buffer>;
    let readBinaryFileStep: ReadBinaryFileStep;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(
        path.join(root, `subdirectory-a`, `subdirectory-b`, `subdirectory-c`),
        { recursive: true }
      );

      await fs.promises.writeFile(
        path.join(
          root,
          `subdirectory-a`,
          `subdirectory-b`,
          `subdirectory-c`,
          `test-file`
        ),
        `Test Content`
      );

      outputSet = jasmine.createSpy(`outputSet`);
      output = { set: outputSet };

      readBinaryFileStep = new ReadBinaryFileStep(
        `Test Name`,
        [
          root,
          `subdirectory-a`,
          `subdirectory-b`,
          `subdirectory-c`,
          `test-file`,
        ],
        output
      );
    });

    afterAll(async () => {
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`exposes its name`, () => {
      expect(readBinaryFileStep.name).toEqual(`Test Name`);
    });

    it(`exposes its output`, () => {
      expect(readBinaryFileStep.output).toBe(output);
    });

    it(`does not output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    let root: string;
    let outputSet: jasmine.Spy;
    let output: Output<Buffer>;
    let readBinaryFileStep: ReadBinaryFileStep;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(
        path.join(root, `subdirectory-a`, `subdirectory-b`, `subdirectory-c`),
        { recursive: true }
      );

      await fs.promises.writeFile(
        path.join(
          root,
          `subdirectory-a`,
          `subdirectory-b`,
          `subdirectory-c`,
          `test-file`
        ),
        new Uint8Array([
          254,
          118,
          241,
          163,
          57,
          25,
          7,
          76,
          194,
          191,
          115,
          209,
          161,
          211,
          213,
          179,
          103,
          63,
          208,
          110,
        ])
      );

      outputSet = jasmine.createSpy(`outputSet`);
      output = { set: outputSet };

      readBinaryFileStep = new ReadBinaryFileStep(
        `Test Name`,
        [
          root,
          `subdirectory-a`,
          `subdirectory-b`,
          `subdirectory-c`,
          `test-file`,
        ],
        output
      );

      await readBinaryFileStep.execute();
    });

    afterAll(async () => {
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`continues to expose its output`, () => {
      expect(readBinaryFileStep.output).toBe(output);
    });

    it(`outputs once`, () => {
      expect(outputSet).toHaveBeenCalledTimes(1);
    });

    it(`outputs the file's content`, () => {
      expect(outputSet).toHaveBeenCalledWith(
        Buffer.from(
          new Uint8Array([
            254,
            118,
            241,
            163,
            57,
            25,
            7,
            76,
            194,
            191,
            115,
            209,
            161,
            211,
            213,
            179,
            103,
            63,
            208,
            110,
          ])
        )
      );
    });
  });
});
