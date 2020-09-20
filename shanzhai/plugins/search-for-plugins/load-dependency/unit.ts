import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { loadDependency } from ".";
import { Plugin } from "../../plugin";

describe(`loadDependency`, () => {
  describe(`unscoped`, () => {
    describe(`when the node_modules directory is missing`, () => {
      let originalWorkingDirectory: string;
      let root: string;
      let error: Error;

      beforeAll(async () => {
        originalWorkingDirectory = process.cwd();

        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(root, { recursive: true });

        process.chdir(root);

        try {
          await loadDependency(`test-package-name`);
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
            `The "node_modules" directory is missing.  Please ensure that dependencies have been installed (execute "npm install").`
          )
        );
      });
    });

    describe(`when the package's directory is missing`, () => {
      let originalWorkingDirectory: string;
      let root: string;
      let error: Error;

      beforeAll(async () => {
        originalWorkingDirectory = process.cwd();

        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(path.join(root, `node_modules`), {
          recursive: true,
        });

        process.chdir(root);

        try {
          await loadDependency(`test-package-name`);
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
            `Dependency "test-package-name" is missing from the "node_modules" directory.  Please ensure that dependencies have been installed (execute "npm install").`
          )
        );
      });
    });

    describe(`when the package.json file is missing`, () => {
      let originalWorkingDirectory: string;
      let root: string;
      let error: Error;

      beforeAll(async () => {
        originalWorkingDirectory = process.cwd();

        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(
          path.join(root, `node_modules`, `test-package-name`),
          {
            recursive: true,
          }
        );

        process.chdir(root);

        try {
          await loadDependency(`test-package-name`);
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
            `Dependency "test-package-name" is missing its "package.json" file.  Please ensure that dependencies have been installed (execute "npm install").`
          )
        );
      });
    });

    describe(`when an unexpected error occurs while reading package.json`, () => {
      let originalWorkingDirectory: string;
      let root: string;
      let error: Error;

      beforeAll(async () => {
        originalWorkingDirectory = process.cwd();

        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(
          path.join(root, `node_modules`, `test-package-name`, `package.json`),
          {
            recursive: true,
          }
        );

        process.chdir(root);

        try {
          await loadDependency(`test-package-name`);
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

    describe(`when an unexpected error occurs while parsing package.json`, () => {
      let originalWorkingDirectory: string;
      let root: string;
      let error: Error;

      beforeAll(async () => {
        originalWorkingDirectory = process.cwd();

        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(
          path.join(root, `node_modules`, `test-package-name`),
          {
            recursive: true,
          }
        );

        await fs.promises.writeFile(
          path.join(root, `node_modules`, `test-package-name`, `package.json`),
          `Test Non-JSON`
        );

        process.chdir(root);

        try {
          await loadDependency(`test-package-name`);
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
          new Error(`Unexpected token T in JSON at position 0`)
        );
      });
    });

    describe(`when package.json does not describe a Shanzhai plugin`, () => {
      let originalWorkingDirectory: string;
      let root: string;
      let result: null | Plugin;

      beforeAll(async () => {
        originalWorkingDirectory = process.cwd();

        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(
          path.join(root, `node_modules`, `test-package-name`),
          {
            recursive: true,
          }
        );

        await fs.promises.writeFile(
          path.join(root, `node_modules`, `test-package-name`, `package.json`),
          `{}`
        );

        process.chdir(root);

        result = await loadDependency(`test-package-name`);
      });

      afterAll(async () => {
        process.chdir(originalWorkingDirectory);
        await fs.promises.rmdir(root, { recursive: true });
      });

      it(`resolves to null`, () => {
        expect(result).toBeNull();
      });
    });

    describe(`when package.json describes a Shanzhai plugin`, () => {
      let originalWorkingDirectory: string;
      let root: string;
      let result: null | Plugin;

      beforeAll(async () => {
        originalWorkingDirectory = process.cwd();

        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(
          path.join(root, `node_modules`, `test-package-name`),
          {
            recursive: true,
          }
        );

        await fs.promises.writeFile(
          path.join(root, `node_modules`, `test-package-name`, `package.json`),
          `{ "shanzhaiPlugin": true }`
        );

        await fs.promises.writeFile(
          path.join(root, `node_modules`, `test-package-name`, `index.js`),
          `module.exports = { perFile: null, aggregation: null };`
        );

        process.chdir(root);

        result = await loadDependency(`test-package-name`);
      });

      afterAll(async () => {
        process.chdir(originalWorkingDirectory);
        await fs.promises.rmdir(root, { recursive: true });
      });

      it(`resolves to the plugin`, () => {
        expect(result).toEqual({
          perFile: null,
          aggregation: null,
        });
      });
    });
  });

  describe(`scoped`, () => {
    describe(`when the node_modules directory is missing`, () => {
      let originalWorkingDirectory: string;
      let root: string;
      let error: Error;

      beforeAll(async () => {
        originalWorkingDirectory = process.cwd();

        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(root, { recursive: true });

        process.chdir(root);

        try {
          await loadDependency(`@test-organization-name/test-package-name`);
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
            `The "node_modules" directory is missing.  Please ensure that dependencies have been installed (execute "npm install").`
          )
        );
      });
    });

    describe(`when the organization's directory is missing`, () => {
      let originalWorkingDirectory: string;
      let root: string;
      let error: Error;

      beforeAll(async () => {
        originalWorkingDirectory = process.cwd();

        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(path.join(root, `node_modules`), {
          recursive: true,
        });

        process.chdir(root);

        try {
          await loadDependency(`@test-organization-name/test-package-name`);
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
            `Dependency "@test-organization-name/test-package-name" is missing from the "node_modules" directory.  Please ensure that dependencies have been installed (execute "npm install").`
          )
        );
      });
    });

    describe(`when the package's directory is missing`, () => {
      let originalWorkingDirectory: string;
      let root: string;
      let error: Error;

      beforeAll(async () => {
        originalWorkingDirectory = process.cwd();

        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(
          path.join(root, `node_modules`, `test-organization-name`),
          {
            recursive: true,
          }
        );

        process.chdir(root);

        try {
          await loadDependency(`@test-organization-name/test-package-name`);
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
            `Dependency "@test-organization-name/test-package-name" is missing from the "node_modules" directory.  Please ensure that dependencies have been installed (execute "npm install").`
          )
        );
      });
    });

    describe(`when the package.json file is missing`, () => {
      let originalWorkingDirectory: string;
      let root: string;
      let error: Error;

      beforeAll(async () => {
        originalWorkingDirectory = process.cwd();

        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(
          path.join(
            root,
            `node_modules`,
            `@test-organization-name`,
            `test-package-name`
          ),
          {
            recursive: true,
          }
        );

        process.chdir(root);

        try {
          await loadDependency(`@test-organization-name/test-package-name`);
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
            `Dependency "@test-organization-name/test-package-name" is missing its "package.json" file.  Please ensure that dependencies have been installed (execute "npm install").`
          )
        );
      });
    });

    describe(`when an unexpected error occurs while reading package.json`, () => {
      let originalWorkingDirectory: string;
      let root: string;
      let error: Error;

      beforeAll(async () => {
        originalWorkingDirectory = process.cwd();

        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(
          path.join(
            root,
            `node_modules`,
            `@test-organization-name`,
            `test-package-name`,
            `package.json`
          ),
          {
            recursive: true,
          }
        );

        process.chdir(root);

        try {
          await loadDependency(`@test-organization-name/test-package-name`);
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

    describe(`when an unexpected error occurs while parsing package.json`, () => {
      let originalWorkingDirectory: string;
      let root: string;
      let error: Error;

      beforeAll(async () => {
        originalWorkingDirectory = process.cwd();

        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(
          path.join(
            root,
            `node_modules`,
            `@test-organization-name`,
            `test-package-name`
          ),
          {
            recursive: true,
          }
        );

        await fs.promises.writeFile(
          path.join(
            root,
            `node_modules`,
            `@test-organization-name`,
            `test-package-name`,
            `package.json`
          ),
          `Test Non-JSON`
        );

        process.chdir(root);

        try {
          await loadDependency(`@test-organization-name/test-package-name`);
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
          new Error(`Unexpected token T in JSON at position 0`)
        );
      });
    });

    describe(`when package.json does not describe a Shanzhai plugin`, () => {
      let originalWorkingDirectory: string;
      let root: string;
      let result: null | Plugin;

      beforeAll(async () => {
        originalWorkingDirectory = process.cwd();

        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(
          path.join(
            root,
            `node_modules`,
            `@test-organization-name`,
            `test-package-name`
          ),
          {
            recursive: true,
          }
        );

        await fs.promises.writeFile(
          path.join(
            root,
            `node_modules`,
            `@test-organization-name`,
            `test-package-name`,
            `package.json`
          ),
          `{}`
        );

        process.chdir(root);

        result = await loadDependency(
          `@test-organization-name/test-package-name`
        );
      });

      afterAll(async () => {
        process.chdir(originalWorkingDirectory);
        await fs.promises.rmdir(root, { recursive: true });
      });

      it(`resolves to null`, () => {
        expect(result).toBeNull();
      });
    });

    describe(`when package.json describes a Shanzhai plugin`, () => {
      let originalWorkingDirectory: string;
      let root: string;
      let result: null | Plugin;

      beforeAll(async () => {
        originalWorkingDirectory = process.cwd();

        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(
          path.join(
            root,
            `node_modules`,
            `@test-organization-name`,
            `test-package-name`
          ),
          {
            recursive: true,
          }
        );

        await fs.promises.writeFile(
          path.join(
            root,
            `node_modules`,
            `@test-organization-name`,
            `test-package-name`,
            `package.json`
          ),
          `{ "shanzhaiPlugin": true }`
        );

        await fs.promises.writeFile(
          path.join(
            root,
            `node_modules`,
            `@test-organization-name`,
            `test-package-name`,
            `index.js`
          ),
          `module.exports = { perFile: null, aggregation: null };`
        );

        process.chdir(root);

        result = await loadDependency(
          `@test-organization-name/test-package-name`
        );
      });

      afterAll(async () => {
        process.chdir(originalWorkingDirectory);
        await fs.promises.rmdir(root, { recursive: true });
      });

      it(`resolves to the plugin`, () => {
        expect(result).toEqual({
          perFile: null,
          aggregation: null,
        });
      });
    });
  });
});
