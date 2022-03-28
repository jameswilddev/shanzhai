import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import * as childProcess from "child_process";
import * as uuid from "uuid";
import * as fsExtra from "fs-extra";

describe(`shanzhai-production-cli`, () => {
  describe(`when there are no steps to execute`, () => {
    let root: string;
    let output: { readonly stdout: string; readonly stderr: string };

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fsExtra.copy(
        path.join(__dirname, `test-data`, `no-steps-to-execute`),
        root
      );

      await fs.promises.rename(
        path.join(root, `nodemodules`),
        path.join(root, `node_modules`)
      );

      await fsExtra.copy(
        path.join(__dirname, `node_modules`),
        path.join(root, `node_modules`)
      );

      output = await new Promise((resolve, reject) => {
        childProcess.exec(
          `node ${__dirname}`,
          { cwd: root },
          (error, stdout, stderr) => {
            if (error) {
              reject(error);
            } else {
              resolve({ stdout, stderr });
            }
          }
        );
      });
    });

    afterAll(async () => {
      await fs.promises.rm(root, { recursive: true });
    });

    it(`produces the expected output`, () => {
      expect(output.stdout).toEqual(``);
      expect(output.stderr).toEqual(
        `Searching for plugins...
Scanning for files...
Planning...
No steps to execute.
`
      );
    });
  });

  describe(`when files with unexpected extensions exist`, () => {
    let root: string;
    let output: childProcess.ExecException;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fsExtra.copy(
        path.join(
          __dirname,
          `test-data`,
          `files-with-unexpected-extensions-exist`
        ),
        root
      );

      await fs.promises.rename(
        path.join(root, `nodemodules`),
        path.join(root, `node_modules`)
      );

      await fsExtra.copy(
        path.join(__dirname, `node_modules`),
        path.join(root, `node_modules`)
      );

      output = await new Promise((resolve, reject) => {
        childProcess.exec(
          `node ${__dirname}`,
          { cwd: root },
          (error, stdout, stderr) => {
            if (error) {
              resolve(error);
            } else {
              reject(`${stdout} ${stderr}`);
            }
          }
        );
      });
    });

    afterAll(async () => {
      await fs.promises.rm(root, { recursive: true });
    });

    it(`produces the expected exit code`, () => {
      expect(output.code).not.toEqual(0);
    });

    it(`produces the expected output`, () => {
      expect(output.message).toMatch(
        /^Command failed: node .*[/\\]@shanzhai[/\\]production-cli\nSearching for plugins\.\.\.\nScanning for files\.\.\.\nPlanning\.\.\.\n\nThe following files were found to not match any installed plugins:\n\n - "example-file-a.with-unexpected-extension"\n - "example-file-b.with-unexpected-extension"\n - "example-file-c.with-unexpected-extension"\n$/
      );
    });

    it(`does not appear to execute any steps`, async () => {
      try {
        await fs.promises.stat(path.join(root, `dist`));
        fail(`The dist directory has been created.`);
      } catch (e) {
        expect((e as NodeJS.ErrnoException).code).toEqual(`ENOENT`);
      }
    });
  });

  describe(`when a step fails`, () => {
    let root: string;
    let output: childProcess.ExecException;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fsExtra.copy(
        path.join(__dirname, `test-data`, `a-step-fails`),
        root
      );

      await fs.promises.rename(
        path.join(root, `nodemodules`),
        path.join(root, `node_modules`)
      );

      await fsExtra.copy(
        path.join(__dirname, `node_modules`),
        path.join(root, `node_modules`)
      );

      output = await new Promise((resolve, reject) => {
        childProcess.exec(
          `node ${__dirname}`,
          { cwd: root },
          (error, stdout, stderr) => {
            if (error) {
              resolve(error);
            } else {
              reject(`${stdout} ${stderr}`);
            }
          }
        );
      });
    });

    afterAll(async () => {
      await fs.promises.rm(root, { recursive: true });
    });

    it(`produces the expected exit code`, () => {
      expect(output.code).not.toEqual(0);
    });

    it(`produces the expected output`, () => {
      expect(output.message).toMatch(
        /^Command failed: node .*[/\\]@shanzhai[/\\]production-cli\nSearching for plugins\.\.\.\nScanning for files\.\.\.\nPlanning\.\.\.\nStarting\.\.\.\n0\/3 \(0%\) Starting "Create Dist"\.\.\.\n1\/3 \(33%\) Step "Create Dist" completed successfully\.\n1\/3 \(33%\) Starting "Read text file "src\/example-file\.example-extension""\.\.\.\n2\/3 \(67%\) Step "Read text file "src\/example-file\.example-extension"" completed successfully\.\n2\/3 \(67%\) Starting "Write File"\.\.\.\n\nError in step "Write File":\nError: ENOENT: no such file or directory, open '.*dist-fake[/\\]example-file\.example-extension'\n$/
      );
    });
  });

  describe(`when all steps succeed`, () => {
    let root: string;
    let output: { readonly stdout: string; readonly stderr: string };

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fsExtra.copy(
        path.join(__dirname, `test-data`, `all-steps-succeed`),
        root
      );

      await fs.promises.rename(
        path.join(root, `nodemodules`),
        path.join(root, `node_modules`)
      );

      await fsExtra.copy(
        path.join(__dirname, `node_modules`),
        path.join(root, `node_modules`)
      );

      output = await new Promise((resolve, reject) => {
        childProcess.exec(
          `node ${__dirname}`,
          { cwd: root },
          (error, stdout, stderr) => {
            if (error) {
              reject(error);
            } else {
              resolve({ stdout, stderr });
            }
          }
        );
      });
    });

    afterAll(async () => {
      await fs.promises.rm(root, { recursive: true });
    });

    it(`produces the expected output`, () => {
      expect(output.stdout).toEqual(``);
      expect(output.stderr).toEqual(
        `Searching for plugins...
Scanning for files...
Planning...
Starting...
0/3 (0%) Starting "Create Dist"...
1/3 (33%) Step "Create Dist" completed successfully.
1/3 (33%) Starting "Read text file "src/example-file.example-extension""...
2/3 (67%) Step "Read text file "src/example-file.example-extension"" completed successfully.
2/3 (67%) Starting "Write File"...
3/3 (100%) Step "Write File" completed successfully.
Done.
`
      );
    });

    it(`appears to have executed`, async () => {
      expect(
        await fs.promises.readFile(
          path.join(root, `dist`, `example-file.example-extension`),
          `utf8`
        )
      ).toEqual(`Example File Content
`);
    });
  });
});
