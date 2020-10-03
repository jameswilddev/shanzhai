import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { searchForPlugins } from ".";
import { Plugin, Trigger } from "@shanzhai/interfaces";

describe(`searchForPlugins`, () => {
  let originalWorkingDirectory: string;
  let root: string;
  let result: ReadonlyArray<Plugin<{ readonly [name: string]: Trigger }>>;

  beforeAll(async () => {
    originalWorkingDirectory = process.cwd();

    root = path.join(os.tmpdir(), uuid.v4());

    await fs.promises.mkdir(root, {
      recursive: true,
    });

    await fs.promises.writeFile(
      path.join(root, `package.json`),
      `{
        "dependencies": {
          "test-non-plugin": "0.0.0",
          "test-unscoped-package-name": "0.0.0",
          "@test-organization-name/test-package-name": "0.0.0"
        }
      }`
    );

    await fs.promises.mkdir(
      path.join(root, `node_modules`, `test-non-plugin`),
      {
        recursive: true,
      }
    );

    await fs.promises.writeFile(
      path.join(root, `node_modules`, `test-non-plugin`, `package.json`),
      `{}`
    );

    await fs.promises.mkdir(
      path.join(root, `node_modules`, `test-unscoped-package-name`),
      {
        recursive: true,
      }
    );

    await fs.promises.writeFile(
      path.join(
        root,
        `node_modules`,
        `test-unscoped-package-name`,
        `package.json`
      ),
      `{ "shanzhaiPlugin": true }`
    );

    await fs.promises.writeFile(
      path.join(root, `node_modules`, `test-unscoped-package-name`, `index.js`),
      `module.exports = {
        perFile: {
          extension: "test extension",
          down: function() { return []; },
          up: function() { return []; },
          regeneratesOnEvents: [],
          raisesEvents: []
        },
        aggregation: null
      };`
    );

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
      `module.exports = {
        perFile: null,
        aggregation: {
          down: [],
          up: [],
          regeneratesOnEvents: [],
          raisesEvents: []
        }
      };`
    );

    process.chdir(root);

    result = await searchForPlugins();
  });

  afterAll(async () => {
    process.chdir(originalWorkingDirectory);
    await fs.promises.rmdir(root, { recursive: true });
  });

  it(`resolves to the plugins`, () => {
    expect(result).toEqual([
      {
        perFile: null,
        aggregation: {
          down: [],
          up: [],
          regeneratesOnEvents: [],
          raisesEvents: [],
        },
      },
      {
        perFile: {
          extension: "test extension",
          down: jasmine.any(Function),
          up: jasmine.any(Function),
          regeneratesOnEvents: [],
          raisesEvents: [],
        },
        aggregation: null,
      },
    ]);
  });
});
