import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { CreateDirectoryStep } from ".";

describe(`CreateDirectoryStep`, () => {
  describe(`when the directory already exists`, () => {
    describe(`on construction`, () => {
      let root: string;
      let writeFileStep: CreateDirectoryStep;

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

        writeFileStep = new CreateDirectoryStep(`Test Name`, [
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
        expect(writeFileStep.name).toEqual(`Test Name`);
      });

      it(`does not remove anything`, async () => {
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
        ).toBeResolvedTo(`Test Content`);
      });
    });

    describe(`on executing`, () => {
      let root: string;
      let writeFileStep: CreateDirectoryStep;

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

        writeFileStep = new CreateDirectoryStep(`Test Name`, [
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
        expect(writeFileStep.name).toEqual(`Test Name`);
      });

      it(`does not remove anything`, async () => {
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
        ).toBeResolvedTo(`Test Content`);
      });
    });
  });

  describe(`when the directory does not exist`, () => {
    describe(`on construction`, () => {
      let root: string;
      let writeFileStep: CreateDirectoryStep;

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

        writeFileStep = new CreateDirectoryStep(`Test Name`, [
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
        expect(writeFileStep.name).toEqual(`Test Name`);
      });

      it(`does not create anything`, async () => {
        await expectAsync(
          fs.promises.readdir(
            path.join(root, `subdirectory-a`, `subdirectory-b`)
          )
        ).toBeResolvedTo([`test-file`]);
      });

      it(`does not remove anything`, async () => {
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
      let writeFileStep: CreateDirectoryStep;

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

        writeFileStep = new CreateDirectoryStep(`Test Name`, [
          root,
          `subdirectory-a`,
          `subdirectory-b`,
          `subdirectory-c`,
        ]);

        await writeFileStep.execute();
      });

      afterAll(async () => {
        await fs.promises.rmdir(root, { recursive: true });
      });

      it(`exposes its name`, () => {
        expect(writeFileStep.name).toEqual(`Test Name`);
      });

      it(`creates an empty directory`, async () => {
        await expectAsync(
          fs.promises.readdir(
            path.join(
              root,
              `subdirectory-a`,
              `subdirectory-b`,
              `subdirectory-c`
            )
          )
        ).toBeResolvedTo([]);
      });

      it(`does not create anything else`, async () => {
        await expectAsync(
          fs.promises.readdir(
            path.join(root, `subdirectory-a`, `subdirectory-b`)
          )
        ).toBeResolvedTo(
          jasmine.arrayWithExactContents([`test-file`, `subdirectory-c`])
        );
      });

      it(`does not remove anything`, async () => {
        await expectAsync(
          fs.promises.readFile(
            path.join(root, `subdirectory-a`, `subdirectory-b`, `test-file`),
            `utf8`
          )
        ).toBeResolvedTo(`Test Content`);
      });
    });
  });

  describe(`when the directory's parent does not exist`, () => {
    describe(`on construction`, () => {
      let root: string;
      let writeFileStep: CreateDirectoryStep;

      beforeAll(async () => {
        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(path.join(root, `subdirectory-a`), {
          recursive: true,
        });

        await fs.promises.writeFile(
          path.join(root, `subdirectory-a`, `test-file`),
          `Test Content`
        );

        writeFileStep = new CreateDirectoryStep(`Test Name`, [
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
        expect(writeFileStep.name).toEqual(`Test Name`);
      });

      it(`does not create anything`, async () => {
        await expectAsync(
          fs.promises.readdir(path.join(root, `subdirectory-a`))
        ).toBeResolvedTo([`test-file`]);
      });

      it(`does not remove anything`, async () => {
        await expectAsync(
          fs.promises.readFile(
            path.join(root, `subdirectory-a`, `test-file`),
            `utf8`
          )
        ).toBeResolvedTo(`Test Content`);
      });
    });

    describe(`on executing`, () => {
      let root: string;
      let writeFileStep: CreateDirectoryStep;

      beforeAll(async () => {
        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(path.join(root, `subdirectory-a`), {
          recursive: true,
        });

        await fs.promises.writeFile(
          path.join(root, `subdirectory-a`, `test-file`),
          `Test Content`
        );

        writeFileStep = new CreateDirectoryStep(`Test Name`, [
          root,
          `subdirectory-a`,
          `subdirectory-b`,
          `subdirectory-c`,
        ]);

        await writeFileStep.execute();
      });

      afterAll(async () => {
        await fs.promises.rmdir(root, { recursive: true });
      });

      it(`exposes its name`, () => {
        expect(writeFileStep.name).toEqual(`Test Name`);
      });

      it(`creates a parent directory`, async () => {
        await expectAsync(
          fs.promises.readdir(
            path.join(root, `subdirectory-a`, `subdirectory-b`)
          )
        ).toBeResolvedTo([`subdirectory-c`]);
      });

      it(`creates an empty directory`, async () => {
        await expectAsync(
          fs.promises.readdir(
            path.join(
              root,
              `subdirectory-a`,
              `subdirectory-b`,
              `subdirectory-c`
            )
          )
        ).toBeResolvedTo([]);
      });

      it(`does not create anything else`, async () => {
        await expectAsync(
          fs.promises.readdir(path.join(root, `subdirectory-a`))
        ).toBeResolvedTo(
          jasmine.arrayWithExactContents([`test-file`, `subdirectory-b`])
        );
      });

      it(`does not remove anything`, async () => {
        await expectAsync(
          fs.promises.readFile(
            path.join(root, `subdirectory-a`, `test-file`),
            `utf8`
          )
        ).toBeResolvedTo(`Test Content`);
      });
    });
  });

  describe(`when the directory's grandparent does not exist`, () => {
    describe(`on construction`, () => {
      let root: string;
      let writeFileStep: CreateDirectoryStep;

      beforeAll(async () => {
        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(root, {
          recursive: true,
        });

        await fs.promises.writeFile(
          path.join(root, `test-file`),
          `Test Content`
        );

        writeFileStep = new CreateDirectoryStep(`Test Name`, [
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
        expect(writeFileStep.name).toEqual(`Test Name`);
      });

      it(`does not create anything`, async () => {
        await expectAsync(fs.promises.readdir(root)).toBeResolvedTo([
          `test-file`,
        ]);
      });

      it(`does not remove anything`, async () => {
        await expectAsync(
          fs.promises.readFile(path.join(root, `test-file`), `utf8`)
        ).toBeResolvedTo(`Test Content`);
      });
    });

    describe(`on executing`, () => {
      let root: string;
      let writeFileStep: CreateDirectoryStep;

      beforeAll(async () => {
        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(root, {
          recursive: true,
        });

        await fs.promises.writeFile(
          path.join(root, `test-file`),
          `Test Content`
        );

        writeFileStep = new CreateDirectoryStep(`Test Name`, [
          root,
          `subdirectory-a`,
          `subdirectory-b`,
          `subdirectory-c`,
        ]);

        await writeFileStep.execute();
      });

      afterAll(async () => {
        await fs.promises.rmdir(root, { recursive: true });
      });

      it(`exposes its name`, () => {
        expect(writeFileStep.name).toEqual(`Test Name`);
      });

      it(`creates a grandparent directory`, async () => {
        await expectAsync(
          fs.promises.readdir(path.join(root, `subdirectory-a`))
        ).toBeResolvedTo([`subdirectory-b`]);
      });

      it(`creates a parent directory`, async () => {
        await expectAsync(
          fs.promises.readdir(
            path.join(root, `subdirectory-a`, `subdirectory-b`)
          )
        ).toBeResolvedTo([`subdirectory-c`]);
      });

      it(`creates an empty directory`, async () => {
        await expectAsync(
          fs.promises.readdir(
            path.join(
              root,
              `subdirectory-a`,
              `subdirectory-b`,
              `subdirectory-c`
            )
          )
        ).toBeResolvedTo([]);
      });

      it(`does not create anything else`, async () => {
        await expectAsync(fs.promises.readdir(path.join(root))).toBeResolvedTo(
          jasmine.arrayWithExactContents([`test-file`, `subdirectory-a`])
        );
      });

      it(`does not remove anything`, async () => {
        await expectAsync(
          fs.promises.readFile(path.join(root, `test-file`), `utf8`)
        ).toBeResolvedTo(`Test Content`);
      });
    });
  });
});
