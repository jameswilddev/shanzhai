import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { searchForPlugins } from ".";
import { Plugin, Trigger } from "@shanzhai/interfaces";

describe(`searchForPlugins`, () => {
  describe(`when the package itself is not a plugin`, () => {
    let originalWorkingDirectory: string;
    let root: string;
    let result: {
      readonly [name: string]: Plugin<{ readonly [name: string]: Trigger }>;
    };

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
        path.join(
          root,
          `node_modules`,
          `test-unscoped-package-name`,
          `a`,
          `path`,
          `to`,
          `a`
        ),
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
        `{ "shanzhaiPlugin": ["a", "path", "to", "a", "module.js"] }`
      );

      await fs.promises.writeFile(
        path.join(
          root,
          `node_modules`,
          `test-unscoped-package-name`,
          `a`,
          `path`,
          `to`,
          `a`,
          `module.js`
        ),
        `module.exports = {
          triggers: [],
          discriminator: "a",
        };`
      );

      await fs.promises.mkdir(
        path.join(
          root,
          `node_modules`,
          `@test-organization-name`,
          `test-package-name`,
          `a`,
          `path`,
          `to`,
          `another`
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
        `{ "shanzhaiPlugin": ["a", "path", "to", "another", "module"] }`
      );

      await fs.promises.writeFile(
        path.join(
          root,
          `node_modules`,
          `@test-organization-name`,
          `test-package-name`,
          `a`,
          `path`,
          `to`,
          `another`,
          `module.js`
        ),
        `module.exports = {
          triggers: [],
          discriminator: "b",
        };`
      );

      process.chdir(root);

      result = await searchForPlugins();
    });

    afterAll(async () => {
      process.chdir(originalWorkingDirectory);
      await fs.promises.rm(root, { recursive: true });
    });

    it(`resolves to the plugins`, () => {
      expect(result).toEqual({
        "test-unscoped-package-name": require(path.join(
          root,
          `node_modules`,
          `test-unscoped-package-name`,
          `a`,
          `path`,
          `to`,
          `a`,
          `module.js`
        )),
        "@test-organization-name/test-package-name": require(path.join(
          root,
          `node_modules`,
          `@test-organization-name`,
          `test-package-name`,
          `a`,
          `path`,
          `to`,
          `another`,
          `module.js`
        )),
      });
    });
  });

  describe(`when the package itself is a plugin`, () => {
    let originalWorkingDirectory: string;
    let root: string;
    let result: {
      readonly [name: string]: Plugin<{ readonly [name: string]: Trigger }>;
    };

    beforeAll(async () => {
      originalWorkingDirectory = process.cwd();

      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(path.join(root, `location`, `of`, `root`), {
        recursive: true,
      });

      await fs.promises.writeFile(
        path.join(root, `package.json`),
        `{
          "dependencies": {
            "test-non-plugin": "0.0.0",
            "test-unscoped-package-name": "0.0.0",
            "@test-organization-name/test-package-name": "0.0.0"
          },
          "shanzhaiPlugin": ["location", "of", "root", "plugin"]
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
        path.join(
          root,
          `node_modules`,
          `test-unscoped-package-name`,
          `a`,
          `path`,
          `to`,
          `a`
        ),
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
        `{ "shanzhaiPlugin": ["a", "path", "to", "a", "module.js"] }`
      );

      await fs.promises.writeFile(
        path.join(
          root,
          `node_modules`,
          `test-unscoped-package-name`,
          `a`,
          `path`,
          `to`,
          `a`,
          `module.js`
        ),
        `module.exports = {
          triggers: [],
          discriminator: "e",
        };`
      );

      await fs.promises.mkdir(
        path.join(
          root,
          `node_modules`,
          `@test-organization-name`,
          `test-package-name`,
          `a`,
          `path`,
          `to`,
          `another`
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
        `{ "shanzhaiPlugin": ["a", "path", "to", "another", "module"] }`
      );

      await fs.promises.writeFile(
        path.join(
          root,
          `node_modules`,
          `@test-organization-name`,
          `test-package-name`,
          `a`,
          `path`,
          `to`,
          `another`,
          `module.js`
        ),
        `module.exports = {
          triggers: [],
          discriminator: "f",
        };`
      );

      await fs.promises.writeFile(
        path.join(root, `location`, `of`, `root`, `plugin.js`),
        `module.exports = {
            triggers: [],
            discriminator: "g",
          };`
      );

      process.chdir(root);

      result = await searchForPlugins();
    });

    afterAll(async () => {
      process.chdir(originalWorkingDirectory);
      await fs.promises.rm(root, { recursive: true });
    });

    it(`resolves to the plugins`, () => {
      expect(result).toEqual({
        ".": require(path.join(root, `location`, `of`, `root`, `plugin.js`)),
        "test-unscoped-package-name": require(path.join(
          root,
          `node_modules`,
          `test-unscoped-package-name`,
          `a`,
          `path`,
          `to`,
          `a`,
          `module.js`
        )),
        "@test-organization-name/test-package-name": require(path.join(
          root,
          `node_modules`,
          `@test-organization-name`,
          `test-package-name`,
          `a`,
          `path`,
          `to`,
          `another`,
          `module.js`
        )),
      });
    });
  });
});
