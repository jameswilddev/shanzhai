import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import * as extractZip from "extract-zip";
import { Input, Output, Effect } from "@shanzhai/interfaces";
import { ZipStep } from ".";

describe(`ZipStep`, () => {
  const outputEffectA: Effect = {
    type: `storeSet`,
    store: { name: `Test Output Effect A` },
  };

  const outputEffectB: Effect = {
    type: `storeSet`,
    store: { name: `Test Output Effect B` },
  };

  const outputEffectC: Effect = {
    type: `storeSet`,
    store: { name: `Test Output Effect C` },
  };

  describe(`on construction`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<{ readonly [path: string]: string | Buffer }>;
    let outputSet: jasmine.Spy;
    let output: Output<Buffer>;
    let zipStep: ZipStep;

    beforeAll(() => {
      inputGet = jasmine.createSpy(`inputAGet`);
      input = {
        get: inputGet,
      };

      outputSet = jasmine.createSpy(`outputSet`);
      output = {
        set: outputSet,
        effects: [outputEffectA, outputEffectB, outputEffectC],
      };

      zipStep = new ZipStep(`Test Name`, input, output);
    });

    it(`exposes its name`, () => {
      expect(zipStep.name).toEqual(`Test Name`);
    });

    it(`exposes the output's effects`, () => {
      expect(zipStep.effects).toEqual([
        outputEffectA,
        outputEffectB,
        outputEffectC,
      ]);
    });

    it(`exposes its input`, () => {
      expect(zipStep.input).toBe(input);
    });

    it(`does not read from its input`, () => {
      expect(inputGet).not.toHaveBeenCalled();
    });

    it(`exposes its output`, () => {
      expect(zipStep.output).toBe(output);
    });

    it(`does not write to its output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });
  });

  describe(`on executing`, () => {
    let inputGet: jasmine.Spy;
    let input: Input<{ readonly [path: string]: string | Buffer }>;
    let outputSet: jasmine.Spy;
    let output: Output<Buffer>;
    let zipStep: ZipStep;

    beforeAll(async () => {
      inputGet = jasmine.createSpy(`inputGet`).and.resolveTo({
        "subdirectory-a/subdirectory-b/file-a": `Test File A Content`,
        "file-b": Buffer.from(
          new Uint8Array([
            254, 118, 241, 163, 57, 25, 7, 76, 194, 191, 115, 209, 161, 211,
            213, 179, 103, 63, 208, 110,
          ])
        ),
        "subdirectory-a/subdirectory-c/file-c": Buffer.from(
          new Uint8Array([211, 176, 53, 61, 89])
        ),
        "file-d": `Test File D Content`,
      });

      input = {
        get: inputGet,
      };

      outputSet = jasmine.createSpy(`outputSet`).and.resolveTo();
      output = {
        set: outputSet,
        effects: [outputEffectA, outputEffectB, outputEffectC],
      };

      zipStep = new ZipStep(`Test Name`, input, output);

      await zipStep.execute();
    });

    it(`continues to expose its input`, () => {
      expect(zipStep.input).toBe(input);
    });

    it(`reads from its input once`, () => {
      expect(inputGet).toHaveBeenCalledTimes(1);
    });

    it(`continues to expose its output`, () => {
      expect(zipStep.output).toBe(output);
    });

    it(`writes to its output once`, () => {
      expect(outputSet).toHaveBeenCalledTimes(1);
    });

    it(`writes a zip to the output which unzips to reveal the included files`, async () => {
      const temporaryDirectory = path.join(os.tmpdir(), uuid.v4());
      const targetPath = `${temporaryDirectory}.zip`;

      const zip = outputSet.calls.argsFor(0)[0];

      try {
        await fs.promises.writeFile(targetPath, zip);

        await extractZip(targetPath, { dir: temporaryDirectory });

        expect((await fs.promises.readdir(temporaryDirectory)).sort()).toEqual([
          `file-b`,
          `file-d`,
          `subdirectory-a`,
        ]);

        expect(
          (
            await fs.promises.readdir(
              path.join(temporaryDirectory, `subdirectory-a`)
            )
          ).sort()
        ).toEqual([`subdirectory-b`, `subdirectory-c`]);

        expect(
          (
            await fs.promises.readdir(
              path.join(temporaryDirectory, `subdirectory-a`, `subdirectory-b`)
            )
          ).sort()
        ).toEqual([`file-a`]);

        expect(
          (
            await fs.promises.readdir(
              path.join(temporaryDirectory, `subdirectory-a`, `subdirectory-c`)
            )
          ).sort()
        ).toEqual([`file-c`]);

        expect(
          await fs.promises.readFile(
            path.join(
              temporaryDirectory,
              `subdirectory-a`,
              `subdirectory-b`,
              `file-a`
            ),
            `utf8`
          )
        ).toEqual(`Test File A Content`);

        expect(
          await fs.promises.readFile(path.join(temporaryDirectory, `file-b`))
        ).toEqual(
          Buffer.from(
            new Uint8Array([
              254, 118, 241, 163, 57, 25, 7, 76, 194, 191, 115, 209, 161, 211,
              213, 179, 103, 63, 208, 110,
            ])
          )
        );

        expect(
          await fs.promises.readFile(
            path.join(
              temporaryDirectory,
              `subdirectory-a`,
              `subdirectory-c`,
              `file-c`
            )
          )
        ).toEqual(Buffer.from(new Uint8Array([211, 176, 53, 61, 89])));

        expect(
          await fs.promises.readFile(
            path.join(temporaryDirectory, `file-d`),
            `utf8`
          )
        ).toEqual(`Test File D Content`);
      } finally {
        await fs.promises.rmdir(temporaryDirectory, { recursive: true });
        await fs.promises.rmdir(targetPath, { recursive: true });
      }
    });
  });
});
