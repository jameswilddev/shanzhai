import * as uuid from "uuid";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import { JSONSchemaForNPMPackageJsonFiles } from "@schemastore/package";
import { readPackageJson } from ".";

fdescribe(`readPackageJson`, () => {
  function resolves(
    description: string,
    packageJson: JSONSchemaForNPMPackageJsonFiles,
    expected: {
      readonly dependencies: ReadonlyArray<string>;
      readonly root: null | ReadonlyArray<string>;
    }
  ): void {
    describe(description, () => {
      let originalWorkingDirectory: string;
      let root: string;
      let actual: {
        readonly dependencies: ReadonlyArray<string>;
        readonly root: null | ReadonlyArray<string>;
      };

      beforeAll(async () => {
        originalWorkingDirectory = process.cwd();

        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(root, { recursive: true });

        process.chdir(root);

        await fs.promises.writeFile(
          `package.json`,
          JSON.stringify(packageJson)
        );

        actual = await readPackageJson();
      });

      afterAll(async () => {
        process.chdir(originalWorkingDirectory);
        await fs.promises.rmdir(root, { recursive: true });
      });

      it(`resolves with the expected content`, () => {
        expect(actual).toEqual(expected);
      });
    });
  }

  resolves(
    `without dependencies without devDependencies without root`,
    {},
    { dependencies: [], root: null }
  );

  resolves(
    `with dependencies without devDependencies without root`,
    {
      dependencies: {
        "test-a-dependency": "0.0.0",
        "test-b-dependency": "0.0.0",
        "test-c-dependency": "0.0.0",
      },
    },
    {
      dependencies: [
        `test-a-dependency`,
        `test-b-dependency`,
        `test-c-dependency`,
      ],
      root: null,
    }
  );

  resolves(
    `without dependencies with devDependencies without root`,
    {
      devDependencies: {
        "test-a-dev-dependency": "0.0.0",
        "test-b-dev-dependency": "0.0.0",
        "test-c-dev-dependency": "0.0.0",
      },
    },
    {
      dependencies: [
        `test-a-dev-dependency`,
        `test-b-dev-dependency`,
        `test-c-dev-dependency`,
      ],
      root: null,
    }
  );

  resolves(
    `with dependencies with devDependencies without root`,
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
    {
      dependencies: [
        `test-a-dependency`,
        `test-b-dev-dependency`,
        `test-c-common-dependency`,
        `test-d-dependency`,
        `test-e-dev-dependency`,
      ],
      root: null,
    }
  );

  resolves(
    `without dependencies without devDependencies with root`,
    { shanzhaiPlugin: [`example`, `path`, `to`, `root`, `plugin`] },
    { dependencies: [], root: [`example`, `path`, `to`, `root`, `plugin`] }
  );

  resolves(
    `with dependencies without devDependencies with root`,
    {
      dependencies: {
        "test-a-dependency": "0.0.0",
        "test-b-dependency": "0.0.0",
        "test-c-dependency": "0.0.0",
      },
      shanzhaiPlugin: [`example`, `path`, `to`, `root`, `plugin`],
    },
    {
      dependencies: [
        `test-a-dependency`,
        `test-b-dependency`,
        `test-c-dependency`,
      ],
      root: [`example`, `path`, `to`, `root`, `plugin`],
    }
  );

  resolves(
    `without dependencies with devDependencies with root`,
    {
      devDependencies: {
        "test-a-dev-dependency": "0.0.0",
        "test-b-dev-dependency": "0.0.0",
        "test-c-dev-dependency": "0.0.0",
      },
      shanzhaiPlugin: [`example`, `path`, `to`, `root`, `plugin`],
    },
    {
      dependencies: [
        `test-a-dev-dependency`,
        `test-b-dev-dependency`,
        `test-c-dev-dependency`,
      ],
      root: [`example`, `path`, `to`, `root`, `plugin`],
    }
  );

  resolves(
    `with dependencies with devDependencies with root`,
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
      shanzhaiPlugin: [`example`, `path`, `to`, `root`, `plugin`],
    },
    {
      dependencies: [
        `test-a-dependency`,
        `test-b-dev-dependency`,
        `test-c-common-dependency`,
        `test-d-dependency`,
        `test-e-dev-dependency`,
      ],
      root: [`example`, `path`, `to`, `root`, `plugin`],
    }
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
        await readPackageJson();
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
        await readPackageJson();
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
