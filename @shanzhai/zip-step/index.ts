import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as childProcess from "child_process";
import * as uuid from "uuid";
import * as _7zipBin from "7zip-bin";
import { Input, Output, ActionStep } from "@shanzhai/interfaces";

/**
 * An {@link ActionStep} which compresses any number of files into a "zip"
 * archive.
 */
export class ZipStep extends ActionStep {
  /**
   * @param name   A description of the operation being performed.
   * @param input  An {@link Input} providing an object of {@link String}s for
   *               text files and {@link Buffer}s for binary files to compress.
   * @param output An {@link Output} to which to write the compressed zip file
   *               (as a {@link Buffer}).
   */
  constructor(
    name: string,
    public readonly input: Input<{ readonly [path: string]: string | Buffer }>,
    public readonly output: Output<Buffer>
  ) {
    super(name, output.effects);
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    const temporaryDirectory = path.join(os.tmpdir(), uuid.v4());
    const targetPath = `${temporaryDirectory}.zip`;

    try {
      await fs.promises.mkdir(temporaryDirectory, { recursive: true });

      const input = await this.input.get();

      for (const name in input) {
        const fileName = path.join(temporaryDirectory, name);

        await fs.promises.mkdir(path.dirname(fileName), { recursive: true });

        await fs.promises.writeFile(fileName, input[name]);
      }

      await new Promise<void>((resolve, reject) => {
        childProcess
          .execFile(_7zipBin.path7za, [
            `a`,
            `-mm=Deflate`,
            `-mfb=258`,
            `-mpass=15`,
            `-r`,
            targetPath,
            path.join(temporaryDirectory, `*`),
          ])
          .on(`error`, reject)
          .on(`exit`, (code) => {
            /* istanbul ignore else */
            if (code === 0) {
              resolve();
            } else {
              // There is no reliable way to trigger this branch - I can only see it happening when out of disk space, or when compressing an extremely large file, or due to a 7za bug - none of which can be reproduced in a test.
              reject(`7za exited with code ${code} (0 expected).`);
            }
          });
      });

      const zip = await fs.promises.readFile(targetPath);
      await this.output.set(zip);
    } finally {
      await fs.promises.rm(targetPath, { recursive: true });
      await fs.promises.rm(temporaryDirectory, { recursive: true });
    }
  }
}
