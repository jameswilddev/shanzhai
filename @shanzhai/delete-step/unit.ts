import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { DeleteStep } from ".";

describe(`DeleteStep`, () => {
  describe(`when the path does not exist`, () => {
    describe(`on construction`, () => {
      let root: string;
      let deleteFileStep: DeleteStep;

      beforeAll(async () => {
        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(
          path.join(root, `subdirectory-a`, `subdirectory-b`),
          { recursive: true }
        );

        await fs.promises.writeFile(
          path.join(root, `subdirectory-a`, `subdirectory-b`, `test-file`),
          `Test Content`
        );

        deleteFileStep = new DeleteStep(`Test Name`, [
          root,
          `subdirectory-a`,
          `subdirectory-b`,
          `subdirectory-c`,
        ]);
      });

      afterAll(async () => {
        await fs.promises.rmdir(root, { recursive: true });
      });

      it(`exposes its name`, () => {
        expect(deleteFileStep.name).toEqual(`Test Name`);
      });

      it(`exposes no effects`, () => {
        expect(deleteFileStep.effects).toEqual([]);
      });

      it(`does not create anything`, async () => {
        await expectAsync(
          fs.promises.readdir(
            path.join(root, `subdirectory-a`, `subdirectory-b`)
          )
        ).toBeResolvedTo([`test-file`]);
      });

      it(`does not remove anything else`, async () => {
        await expectAsync(
          fs.promises.readFile(
            path.join(root, `subdirectory-a`, `subdirectory-b`, `test-file`),
            `utf8`
          )
        ).toBeResolvedTo(`Test Content`);
      });
    });

    describe(`on executing`, () => {
      let root: string;
      let deleteFileStep: DeleteStep;

      beforeAll(async () => {
        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(
          path.join(root, `subdirectory-a`, `subdirectory-b`),
          { recursive: true }
        );

        await fs.promises.writeFile(
          path.join(root, `subdirectory-a`, `subdirectory-b`, `test-file`),
          `Test Content`
        );

        deleteFileStep = new DeleteStep(`Test Name`, [
          root,
          `subdirectory-a`,
          `subdirectory-b`,
          `subdirectory-c`,
        ]);

        await deleteFileStep.execute();
      });

      afterAll(async () => {
        await fs.promises.rmdir(root, { recursive: true });
      });

      it(`does not create anything`, async () => {
        await expectAsync(
          fs.promises.readdir(
            path.join(root, `subdirectory-a`, `subdirectory-b`)
          )
        ).toBeResolvedTo([`test-file`]);
      });

      it(`does not remove anything else`, async () => {
        await expectAsync(
          fs.promises.readFile(
            path.join(root, `subdirectory-a`, `subdirectory-b`, `test-file`),
            `utf8`
          )
        ).toBeResolvedTo(`Test Content`);
      });
    });
  });

  describe(`when the path refers to a directory`, () => {
    describe(`on construction`, () => {
      let root: string;
      let deleteFileStep: DeleteStep;

      beforeAll(async () => {
        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(
          path.join(root, `subdirectory-a`, `subdirectory-b`, `subdirectory-c`),
          { recursive: true }
        );

        await fs.promises.writeFile(
          path.join(root, `subdirectory-a`, `subdirectory-b`, `test-file`),
          `Test Content`
        );

        await fs.promises.writeFile(
          path.join(
            root,
            `subdirectory-a`,
            `subdirectory-b`,
            `subdirectory-c`,
            `test-sub-file`
          ),
          `Test Other Content`
        );

        deleteFileStep = new DeleteStep(`Test Name`, [
          root,
          `subdirectory-a`,
          `subdirectory-b`,
          `subdirectory-c`,
        ]);
      });

      afterAll(async () => {
        await fs.promises.rmdir(root, { recursive: true });
      });

      it(`exposes its name`, () => {
        expect(deleteFileStep.name).toEqual(`Test Name`);
      });

      it(`does not change anything in the parent directory`, async () => {
        await expectAsync(
          fs.promises.readdir(
            path.join(root, `subdirectory-a`, `subdirectory-b`)
          )
        ).toBeResolvedTo(
          jasmine.arrayWithExactContents([`test-file`, `subdirectory-c`])
        );
      });

      it(`does not change anything within the directory`, async () => {
        await expectAsync(
          fs.promises.readdir(
            path.join(
              root,
              `subdirectory-a`,
              `subdirectory-b`,
              `subdirectory-c`
            )
          )
        ).toBeResolvedTo([`test-sub-file`]);
      });

      it(`does not remove any files inside`, async () => {
        await expectAsync(
          fs.promises.readFile(
            path.join(
              root,
              `subdirectory-a`,
              `subdirectory-b`,
              `subdirectory-c`,
              `test-sub-file`
            ),
            `utf8`
          )
        ).toBeResolvedTo(`Test Other Content`);
      });

      it(`does not remove anything else`, async () => {
        await expectAsync(
          fs.promises.readFile(
            path.join(root, `subdirectory-a`, `subdirectory-b`, `test-file`),
            `utf8`
          )
        ).toBeResolvedTo(`Test Content`);
      });
    });

    describe(`on executing`, () => {
      let root: string;
      let deleteFileStep: DeleteStep;

      beforeAll(async () => {
        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(
          path.join(root, `subdirectory-a`, `subdirectory-b`, `subdirectory-c`),
          { recursive: true }
        );

        await fs.promises.writeFile(
          path.join(root, `subdirectory-a`, `subdirectory-b`, `test-file`),
          `Test Content`
        );

        await fs.promises.writeFile(
          path.join(
            root,
            `subdirectory-a`,
            `subdirectory-b`,
            `subdirectory-c`,
            `test-sub-file`
          ),
          `Test Other Content`
        );

        deleteFileStep = new DeleteStep(`Test Name`, [
          root,
          `subdirectory-a`,
          `subdirectory-b`,
          `subdirectory-c`,
        ]);

        await deleteFileStep.execute();
      });

      afterAll(async () => {
        await fs.promises.rmdir(root, { recursive: true });
      });

      it(`removes the directory`, async () => {
        await expectAsync(
          fs.promises.readdir(
            path.join(root, `subdirectory-a`, `subdirectory-b`)
          )
        ).toBeResolvedTo([`test-file`]);
      });

      it(`does not remove anything else`, async () => {
        await expectAsync(
          fs.promises.readFile(
            path.join(root, `subdirectory-a`, `subdirectory-b`, `test-file`),
            `utf8`
          )
        ).toBeResolvedTo(`Test Content`);
      });
    });
  });

  describe(`when the path refers to a file`, () => {
    describe(`on construction`, () => {
      let root: string;
      let deleteFileStep: DeleteStep;

      beforeAll(async () => {
        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(
          path.join(root, `subdirectory-a`, `subdirectory-b`),
          { recursive: true }
        );

        await fs.promises.writeFile(
          path.join(root, `subdirectory-a`, `subdirectory-b`, `test-file`),
          `Test Content`
        );

        await fs.promises.writeFile(
          path.join(root, `subdirectory-a`, `subdirectory-b`, `test-file-2`),
          `Test Content To Be Removed`
        );

        deleteFileStep = new DeleteStep(`Test Name`, [
          root,
          `subdirectory-a`,
          `subdirectory-b`,
          `test-file-2`,
        ]);
      });

      afterAll(async () => {
        await fs.promises.rmdir(root, { recursive: true });
      });

      it(`exposes its name`, () => {
        expect(deleteFileStep.name).toEqual(`Test Name`);
      });

      it(`does not remove the file`, async () => {
        await expectAsync(
          fs.promises.readFile(
            path.join(root, `subdirectory-a`, `subdirectory-b`, `test-file-2`),
            `utf8`
          )
        ).toBeResolvedTo(`Test Content To Be Removed`);
      });

      it(`does not remove anything else`, async () => {
        await expectAsync(
          fs.promises.readFile(
            path.join(root, `subdirectory-a`, `subdirectory-b`, `test-file`),
            `utf8`
          )
        ).toBeResolvedTo(`Test Content`);
      });
    });

    describe(`on executing`, () => {
      let root: string;
      let deleteFileStep: DeleteStep;

      beforeAll(async () => {
        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(
          path.join(root, `subdirectory-a`, `subdirectory-b`, `subdirectory-c`),
          { recursive: true }
        );

        await fs.promises.writeFile(
          path.join(root, `subdirectory-a`, `subdirectory-b`, `test-file`),
          `Test Content`
        );

        await fs.promises.writeFile(
          path.join(root, `subdirectory-a`, `subdirectory-b`, `test-file-2`),
          `Test Content To Be Removed`
        );

        deleteFileStep = new DeleteStep(`Test Name`, [
          root,
          `subdirectory-a`,
          `subdirectory-b`,
          `test-file-2`,
        ]);

        await deleteFileStep.execute();
      });

      afterAll(async () => {
        await fs.promises.rmdir(root, { recursive: true });
      });

      it(`removes the file`, async () => {
        await expectAsync(
          fs.promises.readdir(
            path.join(root, `subdirectory-a`, `subdirectory-b`)
          )
        ).toBeResolvedTo(
          jasmine.arrayWithExactContents([`subdirectory-c`, `test-file`])
        );
      });

      it(`does not remove anything else`, async () => {
        await expectAsync(
          fs.promises.readFile(
            path.join(root, `subdirectory-a`, `subdirectory-b`, `test-file`),
            `utf8`
          )
        ).toBeResolvedTo(`Test Content`);
      });
    });
  });
});
