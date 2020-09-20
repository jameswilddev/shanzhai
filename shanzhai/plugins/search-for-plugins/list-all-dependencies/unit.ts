import * as uuid from "uuid";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import { JSONSchemaForNPMPackageJsonFiles } from "@schemastore/package";
import { listAllDependencies } from ".";

describe(`listAllDependencies`, () => {
  function resolves(
    description: string,
    packageJson: JSONSchemaForNPMPackageJsonFiles,
    expected: ReadonlyArray<string>
  ): void {
    describe(description, () => {
      let originalWorkingDirectory: string;
      let root: string;
      let actual: ReadonlyArray<string>;

      beforeAll(async () => {
        originalWorkingDirectory = process.cwd();

        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(root, { recursive: true });

        process.chdir(root);

        await fs.promises.writeFile(
          `package.json`,
          JSON.stringify(packageJson)
        );

        actual = await listAllDependencies();
      });

      afterAll(async () => {
        process.chdir(originalWorkingDirectory);
        await fs.promises.rmdir(root, { recursive: true });
      });

      it(`resolves with the expected list of dependencies`, () => {
        expect(actual).toEqual(expected);
      });
    });
  }

  resolves(`without dependencies without devDependencies`, {}, []);

  resolves(
    `with dependencies without devDependencies`,
    {
      dependencies: {
        "test-a-dependency": "0.0.0",
        "test-b-dependency": "0.0.0",
        "test-c-dependency": "0.0.0",
      },
    },
    [`test-a-dependency`, `test-b-dependency`, `test-c-dependency`]
  );

  resolves(
    `without dependencies with devDependencies`,
    {
      devDependencies: {
        "test-a-dev-dependency": "0.0.0",
        "test-b-dev-dependency": "0.0.0",
        "test-c-dev-dependency": "0.0.0",
      },
    },
    [`test-a-dev-dependency`, `test-b-dev-dependency`, `test-c-dev-dependency`]
  );

  resolves(
    `with dependencies with devDependencies`,
    {
      dependencies: {
        "test-a-dependency": "0.0.0",
        "test-c-common-dependency": "0.0.0",
        "test-d-dependency": "0.0.0",
      },
      devDependencies: {
        "test-b-dev-dependency": "0.0.0",
        "test-c-common-dependency": "0.0.0",
        "test-e-dev-dependency": "0.0.0",
      },
    },
    [
      `test-a-dependency`,
      `test-b-dev-dependency`,
      `test-c-common-dependency`,
      `test-d-dependency`,
      `test-e-dev-dependency`,
    ]
  );

  describe(`no package.json`, () => {
    let originalWorkingDirectory: string;
    let root: string;
    let error: Error;

    beforeAll(async () => {
      originalWorkingDirectory = process.cwd();

      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      process.chdir(root);

      try {
        await listAllDependencies();
      } catch (e) {
        error = e;
      }
    });

    afterAll(async () => {
      process.chdir(originalWorkingDirectory);
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`rejects with the expected error`, () => {
      expect(error).toEqual(
        new Error(
          `Failed to find the "package.json" file.  Please ensure that the current working directory is the root of the project.`
        )
      );
    });
  });

  describe(`unexpected error reading package.json`, () => {
    let originalWorkingDirectory: string;
    let root: string;
    let error: Error;

    beforeAll(async () => {
      originalWorkingDirectory = process.cwd();

      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(path.join(root, `package.json`), {
        recursive: true,
      });

      process.chdir(root);

      try {
        await listAllDependencies();
      } catch (e) {
        error = e;
      }
    });

    afterAll(async () => {
      process.chdir(originalWorkingDirectory);
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`rejects with the expected error`, () => {
      expect(error).toEqual(
        new Error(`EISDIR: illegal operation on a directory, read`)
      );
    });
  });
});
