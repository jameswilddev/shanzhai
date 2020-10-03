import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { hashFile } from ".";

describe(`hashFile`, () => {
  let root: string;
  beforeAll(async () => {
    root = path.join(os.tmpdir(), uuid.v4());

    await fs.promises.mkdir(root, { recursive: true });
  });

  afterAll(async () => {
    await fs.promises.rmdir(root, { recursive: true });
  });

  describe(`when the file does not exist`, () => {
    it(`rethrows the error`, async () =>
      expectAsync(
        hashFile(path.join(root, `nonexistent-file`))
      ).toBeRejectedWith(jasmine.objectContaining({ code: `ENOENT` })));
  });

  describe(`when the file is empty`, () => {
    beforeAll(async () => {
      await fs.promises.writeFile(
        path.join(root, `empty-file`),
        Buffer.from(new Uint8Array(0))
      );
    });

    it(`returns the sha1 of the file`, async () =>
      expectAsync(hashFile(path.join(root, `empty-file`))).toBeResolvedTo(
        `da39a3ee5e6b4b0d3255bfef95601890afd80709`
      ));
  });

  describe(`when the file is non-empty`, () => {
    beforeAll(async () => {
      await fs.promises.writeFile(
        path.join(root, `non-empty-file`),
        Buffer.from(new Uint8Array([23, 38, 112, 92, 10, 240, 199]))
      );
    });

    it(`returns the sha1 of the file`, async () =>
      expectAsync(hashFile(path.join(root, `non-empty-file`))).toBeResolvedTo(
        `a9bfa7917fc69812c668f5a62aed8c85ee92da45`
      ));
  });
});
