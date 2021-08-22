import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { Output, Effect, UnkeyedStore } from "@shanzhai/interfaces";
import { ReadTextFileStep } from ".";

describe(`ReadTextFileStep`, () => {
  const unkeyedStore: UnkeyedStore<unknown> = {
    type: `unkeyedStore`,
    name: `Test Unkeyed Store`,
    get: jasmine.createSpy(`unkeyedStore.get`).and.callFake(fail),
    set: jasmine.createSpy(`unkeyedStore.set`).and.callFake(fail),
    delete: jasmine.createSpy(`unkeyedStore.delete`).and.callFake(fail),
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
    let output: Output<string>;
    let readTextFileStep: ReadTextFileStep;

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

      readTextFileStep = new ReadTextFileStep(
        [`subdirectory-a`, `subdirectory-b`, `subdirectory-c`, `test-file`],
        output
      );
    });

    afterAll(async () => {
      process.chdir(originalWorkingDirectory);

      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`exposes its name`, () => {
      expect(readTextFileStep.name).toEqual(
        `Read text file "subdirectory-a/subdirectory-b/subdirectory-c/test-file"`
      );
    });

    it(`exposes the output's effects`, () => {
      expect(readTextFileStep.effects).toEqual([
        outputEffectA,
        outputEffectB,
        outputEffectC,
      ]);
    });

    it(`exposes its output`, () => {
      expect(readTextFileStep.output).toBe(output);
    });

    it(`does not output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    let originalWorkingDirectory: string;
    let root: string;
    let outputSet: jasmine.Spy;
    let output: Output<string>;
    let readTextFileStep: ReadTextFileStep;

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
          `subdirectory-a`,
          `subdirectory-b`,
          `subdirectory-c`,
          `test-file`
        ),
        `Test Content`
      );

      outputSet = jasmine.createSpy(`outputSet`).and.resolveTo();
      output = {
        set: outputSet,
        effects: [outputEffectA, outputEffectB, outputEffectC],
      };

      readTextFileStep = new ReadTextFileStep(
        [
          root,
          `subdirectory-a`,
          `subdirectory-b`,
          `subdirectory-c`,
          `test-file`,
        ],
        output
      );

      await readTextFileStep.execute();
    });

    afterAll(async () => {
      process.chdir(originalWorkingDirectory);

      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`continues to expose its output`, () => {
      expect(readTextFileStep.output).toBe(output);
    });

    it(`outputs once`, () => {
      expect(outputSet).toHaveBeenCalledTimes(1);
    });

    it(`outputs the file's content`, () => {
      expect(outputSet).toHaveBeenCalledWith(`Test Content`);
    });
  });
});
