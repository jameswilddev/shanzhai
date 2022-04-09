import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { Output, Effect, UnkeyedStore } from "@shanzhai/interfaces";
import { ReadBinaryFileStep } from ".";

describe(`ReadBinaryFileStep`, () => {
  const unkeyedStore: UnkeyedStore<unknown> = {
    type: `unkeyedStore`,
    name: `Test Unkeyed Store`,
    get: jasmine.createSpy(`unkeyedStore.get`).and.callFake(fail),
    set: jasmine.createSpy(`unkeyedStore.set`).and.callFake(fail),
  };

  const outputEffectA: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const outputEffectB: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const outputEffectC: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  describe(`on construction`, () => {
    let originalWorkingDirectory: string;
    let root: string;
    let outputSet: jasmine.Spy;
    let output: Output<Buffer>;
    let readBinaryFileStep: ReadBinaryFileStep;

    beforeAll(async () => {
      originalWorkingDirectory = process.cwd();

      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(
        path.join(root, `subdirectory-a`, `subdirectory-b`, `subdirectory-c`),
        { recursive: true }
      );

      process.chdir(root);

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
      output = {
        set: outputSet,
        effects: [outputEffectA, outputEffectB, outputEffectC],
      };

      readBinaryFileStep = new ReadBinaryFileStep(
        [`subdirectory-a`, `subdirectory-b`, `subdirectory-c`, `test-file`],
        output
      );
    });

    afterAll(async () => {
      process.chdir(originalWorkingDirectory);

      await fs.promises.rm(root, { recursive: true });
    });

    it(`exposes its name`, () => {
      expect(readBinaryFileStep.name).toEqual(
        `Read binary file "subdirectory-a/subdirectory-b/subdirectory-c/test-file"`
      );
    });

    it(`exposes the output's effects`, () => {
      expect(readBinaryFileStep.effects).toEqual([
        outputEffectA,
        outputEffectB,
        outputEffectC,
      ]);
    });

    it(`exposes its output`, () => {
      expect(readBinaryFileStep.output).toBe(output);
    });

    it(`does not output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    let originalWorkingDirectory: string;
    let root: string;
    let outputSet: jasmine.Spy;
    let output: Output<Buffer>;
    let readBinaryFileStep: ReadBinaryFileStep;

    beforeAll(async () => {
      originalWorkingDirectory = process.cwd();

      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(
        path.join(root, `subdirectory-a`, `subdirectory-b`, `subdirectory-c`),
        { recursive: true }
      );

      process.chdir(root);

      await fs.promises.writeFile(
        path.join(
          root,
          `subdirectory-a`,
          `subdirectory-b`,
          `subdirectory-c`,
          `test-file`
        ),
        new Uint8Array([
          254, 118, 241, 163, 57, 25, 7, 76, 194, 191, 115, 209, 161, 211, 213,
          179, 103, 63, 208, 110,
        ])
      );

      outputSet = jasmine.createSpy(`outputSet`).and.resolveTo();
      output = {
        set: outputSet,
        effects: [outputEffectA, outputEffectB, outputEffectC],
      };

      readBinaryFileStep = new ReadBinaryFileStep(
        [`subdirectory-a`, `subdirectory-b`, `subdirectory-c`, `test-file`],
        output
      );

      await readBinaryFileStep.execute();
    });

    afterAll(async () => {
      process.chdir(originalWorkingDirectory);

      await fs.promises.rm(root, { recursive: true });
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
            254, 118, 241, 163, 57, 25, 7, 76, 194, 191, 115, 209, 161, 211,
            213, 179, 103, 63, 208, 110,
          ])
        )
      );
    });
  });
});
