import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { Hashes } from "@shanzhai/change-tracking-helpers";
import { scanDirectory } from ".";

describe(`scanDirectory`, () => {
  describe(`when the directory is empty`, () => {
    let root: string;
    let promise: Promise<Hashes>;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      promise = scanDirectory(root);
    });

    afterAll(async () => {
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`returns the expected object of hashes`, async () => {
      await expectAsync(promise).toBeResolvedTo({});
    });
  });

  describe(`when the directory exists`, () => {
    let root: string;
    let promise: Promise<Hashes>;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

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

      promise = scanDirectory(root);
    });

    afterAll(async () => {
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`returns the expected object of hashes`, async () => {
      await expectAsync(promise).toBeResolvedTo({
        "at-root": `311e6e92408f2f6bd98cea1f4902e12c90453291`,
        "level-one/level-two/level-three/deeply-nested": `45ff1166b6f77d161fb0c5bc7215d97b9ff58611`,
      });
    });
  });
});
