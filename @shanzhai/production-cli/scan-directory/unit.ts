import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { scanDirectory } from ".";

describe(`scanDirectory`, () => {
  describe(`when the directory is empty`, () => {
    let root: string;
    let promise: Promise<ReadonlyArray<string>>;
    let originalCwd: string;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      originalCwd = process.cwd();

      await fs.promises.mkdir(root, { recursive: true });
      process.chdir(root);

      promise = scanDirectory();
    });

    afterAll(async () => {
      process.chdir(originalCwd);
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`returns the expected array of file names`, async () => {
      await expectAsync(promise).toBeResolvedTo([]);
    });
  });

  describe(`when the directory exists`, () => {
    let root: string;
    let promise: Promise<ReadonlyArray<string>>;
    let originalCwd: string;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      originalCwd = process.cwd();

      await fs.promises.mkdir(root, { recursive: true });
      process.chdir(root);

      await fs.promises.writeFile(
        path.join(root, `at-root`),
        `Test File Content A`
      );
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
      );

      await fs.promises.writeFile(
        path.join(root, `level-one`, `level-two`, `.excluded-file`),
        `Test File Content B`
      );

      await fs.promises.writeFile(
        path.join(
          root,
          `level-one`,
          `level-two`,
          `level-three`,
          `deeply-nested`
        ),
        `Test File Content C`
      );
      await fs.promises.utimes(
        path.join(
          root,
          `level-one`,
          `level-two`,
          `level-three`,
          `deeply-nested`
        ),
        3463789,
        768936
      );

      await fs.promises.mkdir(
        path.join(
          root,
          `level-one`,
          `.filtered-level-two`,
          `filtered-level-three`
        ),
        { recursive: true }
      );

      await fs.promises.writeFile(
        path.join(
          root,
          `level-one`,
          `.filtered-level-two`,
          `file-filtered-by-parent`
        ),
        `Test File Content D`
      );

      await fs.promises.writeFile(
        path.join(
          root,
          `level-one`,
          `.filtered-level-two`,
          `filtered-level-three`,
          `file-filtered-by-parents-parent`
        ),
        `Test File Content E`
      );

      promise = scanDirectory();
    });

    afterAll(async () => {
      process.chdir(originalCwd);

      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`returns the expected array of file names`, async () => {
      await expectAsync(promise).toBeResolvedTo([
        `at-root`,
        `level-one/level-two/level-three/deeply-nested`,
      ]);
    });
  });
});
