import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import * as extractZip from "extract-zip";
import { Output } from "../../../outputs/output";
import { ZipFileEntry, ZipStep } from ".";

describe(`ZipStep`, () => {
  describe(`on construction`, () => {
    let inputAGet: jasmine.Spy;
    let inputA: ZipFileEntry<string>;
    let inputBGet: jasmine.Spy;
    let inputB: ZipFileEntry<Buffer>;
    let inputCGet: jasmine.Spy;
    let inputC: ZipFileEntry<Buffer>;
    let inputDGet: jasmine.Spy;
    let inputD: ZipFileEntry<string>;
    let outputSet: jasmine.Spy;
    let output: Output<Buffer>;
    let zipStep: ZipStep;

    beforeAll(() => {
      inputAGet = jasmine.createSpy(`inputAGet`);
      inputA = {
        pathSegments: [`subdirectory-a`, `subdirectory-b`, `file-a`],
        content: { get: inputAGet },
      };

      inputBGet = jasmine.createSpy(`inputAGet`);
      inputB = {
        pathSegments: [`file-b`],
        content: { get: inputBGet },
      };

      inputCGet = jasmine.createSpy(`inputCGet`);
      inputC = {
        pathSegments: [`subdirectory-a`, `subdirectory-c`, `file-c`],
        content: { get: inputCGet },
      };

      inputDGet = jasmine.createSpy(`inputDGet`);
      inputD = {
        pathSegments: [`file-d`],
        content: { get: inputDGet },
      };

      outputSet = jasmine.createSpy(`outputSet`);
      output = { set: outputSet };

      zipStep = new ZipStep(
        `Test Name`,
        [inputA, inputB, inputC, inputD],
        output
      );
    });

    it(`exposes its name`, () => {
      expect(zipStep.name).toEqual(`Test Name`);
    });

    it(`exposes its inputs`, () => {
      expect(zipStep.inputs).toEqual([inputA, inputB, inputC, inputD]);
    });

    it(`does not read from its inputs`, () => {
      expect(inputAGet).not.toHaveBeenCalled();
      expect(inputBGet).not.toHaveBeenCalled();
      expect(inputCGet).not.toHaveBeenCalled();
      expect(inputDGet).not.toHaveBeenCalled();
    });

    it(`exposes its output`, () => {
      expect(zipStep.output).toBe(output);
    });

    it(`does not write to its output`, () => {
      expect(outputSet).not.toHaveBeenCalled();
    });
  });

  describe(`on executing`, () => {
    let inputAGet: jasmine.Spy;
    let inputA: ZipFileEntry<string>;
    let inputBGet: jasmine.Spy;
    let inputB: ZipFileEntry<Buffer>;
    let inputCGet: jasmine.Spy;
    let inputC: ZipFileEntry<Buffer>;
    let inputDGet: jasmine.Spy;
    let inputD: ZipFileEntry<string>;
    let outputSet: jasmine.Spy;
    let output: Output<Buffer>;
    let zipStep: ZipStep;

    beforeAll(async () => {
      inputAGet = jasmine
        .createSpy(`inputAGet`)
        .and.returnValue(`Test File A Content`);
      inputA = {
        pathSegments: [`subdirectory-a`, `subdirectory-b`, `file-a`],
        content: { get: inputAGet },
      };

      inputBGet = jasmine
        .createSpy(`inputAGet`)
        .and.returnValue(
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
      inputB = {
        pathSegments: [`file-b`],
        content: { get: inputBGet },
      };

      inputCGet = jasmine
        .createSpy(`inputCGet`)
        .and.returnValue(Buffer.from(new Uint8Array([211, 176, 53, 61, 89])));
      inputC = {
        pathSegments: [`subdirectory-a`, `subdirectory-c`, `file-c`],
        content: { get: inputCGet },
      };

      inputDGet = jasmine
        .createSpy(`inputDGet`)
        .and.returnValue(`Test File D Content`);
      inputD = {
        pathSegments: [`file-d`],
        content: { get: inputDGet },
      };

      outputSet = jasmine.createSpy(`outputSet`);
      output = { set: outputSet };

      zipStep = new ZipStep(
        `Test Name`,
        [inputA, inputB, inputC, inputD],
        output
      );

      await zipStep.execute();
    });

    it(`continues to expose its inputs`, () => {
      expect(zipStep.inputs).toEqual([inputA, inputB, inputC, inputD]);
    });

    it(`reads from its inputs once`, () => {
      expect(inputAGet).toHaveBeenCalledTimes(1);
      expect(inputBGet).toHaveBeenCalledTimes(1);
      expect(inputCGet).toHaveBeenCalledTimes(1);
      expect(inputDGet).toHaveBeenCalledTimes(1);
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
