import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { Timestamps } from "@shanzhai/change-tracking-helpers";
import { scanDirectory } from ".";

describe(`scanDirectory`, () => {
  describe(`when the directory is empty`, () => {
    let root: string;
    let promise: Promise<Timestamps>;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      promise = scanDirectory(root);
    });

    afterAll(async () => {
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`returns the expected object of timestamps`, async () => {
      await expectAsync(promise).toBeResolvedTo({});
    });
  });

  describe(`when the directory exists`, () => {
    let root: string;
    let promise: Promise<Timestamps>;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
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
        Buffer.alloc(0)
      );

      await fs.promises.writeFile(
        path.join(
          root,
          `level-one`,
          `level-two`,
          `level-three`,
          `deeply-nested`
        ),
        Buffer.alloc(0)
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
        Buffer.alloc(0)
      );

      await fs.promises.writeFile(
        path.join(
          root,
          `level-one`,
          `.filtered-level-two`,
          `filtered-level-three`,
          `file-filtered-by-parents-parent`
        ),
        Buffer.alloc(0)
      );

      promise = scanDirectory(root);
    });

    afterAll(async () => {
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`returns the expected object of timestamps`, async () => {
      await expectAsync(promise).toBeResolvedTo({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });
});
