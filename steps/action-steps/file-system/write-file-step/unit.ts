import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { Input } from "../../../inputs/input";
import { WriteFileStep } from ".";

describe(`WriteFileStep`, () => {
  const forType = <T extends string | Buffer>(
    description: string,
    value: T,
    options: undefined | `utf8`
  ): void => {
    describe(description, () => {
      describe(`when the file does not exist`, () => {
        describe(`on construction`, () => {
          let root: string;
          let inputGet: jasmine.Spy;
          let input: Input<T>;
          let writeFileStep: WriteFileStep<T>;

          beforeAll(async () => {
            root = path.join(os.tmpdir(), uuid.v4());

            await fs.promises.mkdir(
              path.join(
                root,
                `subdirectory-a`,
                `subdirectory-b`,
                `subdirectory-c`
              ),
              { recursive: true }
            );

            inputGet = jasmine.createSpy(`inputGet`);
            input = { get: inputGet };

            writeFileStep = new WriteFileStep<T>(
              `Test Name`,
              [
                root,
                `subdirectory-a`,
                `subdirectory-b`,
                `subdirectory-c`,
                `test-file`,
              ],
              input
            );
          });

          afterAll(async () => {
            await fs.promises.rmdir(root, { recursive: true });
          });

          it(`exposes its name`, () => {
            expect(writeFileStep.name).toEqual(`Test Name`);
          });

          it(`exposes its input`, () => {
            expect(writeFileStep.input).toBe(input);
          });

          it(`does not read`, () => {
            expect(inputGet).not.toHaveBeenCalled();
          });

          it(`does not write the file`, async () => {
            await expectAsync(
              fs.promises.stat(
                path.join(
                  root,
                  `subdirectory-a`,
                  `subdirectory-b`,
                  `subdirectory-c`,
                  `test-file`
                )
              )
            ).toBeRejected();
          });
        });

        describe(`on execution`, () => {
          let root: string;
          let inputGet: jasmine.Spy;
          let input: Input<T>;
          let writeFileStep: WriteFileStep<T>;

          beforeAll(async () => {
            root = path.join(os.tmpdir(), uuid.v4());

            await fs.promises.mkdir(
              path.join(
                root,
                `subdirectory-a`,
                `subdirectory-b`,
                `subdirectory-c`
              ),
              { recursive: true }
            );

            inputGet = jasmine.createSpy(`inputGet`).and.returnValue(value);
            input = { get: inputGet };

            writeFileStep = new WriteFileStep<T>(
              `Test Name`,
              [
                root,
                `subdirectory-a`,
                `subdirectory-b`,
                `subdirectory-c`,
                `test-file`,
              ],
              input
            );

            await writeFileStep.execute();
          });

          afterAll(async () => {
            await fs.promises.rmdir(root, { recursive: true });
          });

          it(`continues to expose its input`, () => {
            expect(writeFileStep.input).toBe(input);
          });

          it(`reads once`, () => {
            expect(inputGet).toHaveBeenCalledTimes(1);
          });

          it(`writes the file`, async () => {
            await expectAsync(
              fs.promises.readFile(
                path.join(
                  root,
                  `subdirectory-a`,
                  `subdirectory-b`,
                  `subdirectory-c`,
                  `test-file`
                ),
                options
              )
            ).toBeResolvedTo(value);
          });
        });
      });

      describe(`when the file already exists`, () => {
        describe(`on construction`, () => {
          let root: string;
          let inputGet: jasmine.Spy;
          let input: Input<T>;
          let writeFileStep: WriteFileStep<T>;

          beforeAll(async () => {
            root = path.join(os.tmpdir(), uuid.v4());

            await fs.promises.mkdir(
              path.join(
                root,
                `subdirectory-a`,
                `subdirectory-b`,
                `subdirectory-c`
              ),
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
              `Test Existing`
            );

            inputGet = jasmine.createSpy(`inputGet`);
            input = { get: inputGet };

            writeFileStep = new WriteFileStep<T>(
              `Test Name`,
              [
                root,
                `subdirectory-a`,
                `subdirectory-b`,
                `subdirectory-c`,
                `test-file`,
              ],
              input
            );
          });

          afterAll(async () => {
            await fs.promises.rmdir(root, { recursive: true });
          });

          it(`exposes its name`, () => {
            expect(writeFileStep.name).toEqual(`Test Name`);
          });

          it(`exposes its input`, () => {
            expect(writeFileStep.input).toBe(input);
          });

          it(`does not read`, () => {
            expect(inputGet).not.toHaveBeenCalled();
          });

          it(`does not write the file`, async () => {
            await expectAsync(
              fs.promises.readFile(
                path.join(
                  root,
                  `subdirectory-a`,
                  `subdirectory-b`,
                  `subdirectory-c`,
                  `test-file`
                ),
                `utf8`
              )
            ).toBeResolvedTo(`Test Existing`);
          });
        });

        describe(`on execution`, () => {
          let root: string;
          let inputGet: jasmine.Spy;
          let input: Input<T>;
          let writeFileStep: WriteFileStep<T>;

          beforeAll(async () => {
            root = path.join(os.tmpdir(), uuid.v4());

            await fs.promises.mkdir(
              path.join(
                root,
                `subdirectory-a`,
                `subdirectory-b`,
                `subdirectory-c`
              ),
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
              `Test Existing`
            );

            inputGet = jasmine.createSpy(`inputGet`).and.returnValue(value);
            input = { get: inputGet };

            writeFileStep = new WriteFileStep<T>(
              `Test Name`,
              [
                root,
                `subdirectory-a`,
                `subdirectory-b`,
                `subdirectory-c`,
                `test-file`,
              ],
              input
            );

            await writeFileStep.execute();
          });

          afterAll(async () => {
            await fs.promises.rmdir(root, { recursive: true });
          });

          it(`continues to expose its input`, () => {
            expect(writeFileStep.input).toBe(input);
          });

          it(`reads once`, () => {
            expect(inputGet).toHaveBeenCalledTimes(1);
          });

          it(`writes the file`, async () => {
            await expectAsync(
              fs.promises.readFile(
                path.join(
                  root,
                  `subdirectory-a`,
                  `subdirectory-b`,
                  `subdirectory-c`,
                  `test-file`
                ),
                options
              )
            ).toBeResolvedTo(value);
          });
        });
      });
    });
  };

  forType<string>(`text`, `Test Content`, `utf8`);

  forType<Buffer>(
    `binary`,
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
    ),
    undefined
  );
});
