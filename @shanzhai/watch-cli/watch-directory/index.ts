import * as fs from "fs";
import * as path from "path";
import * as chokidar from "chokidar";
import {
  Hashes,
  hashFile,
  pathAccepted,
} from "@shanzhai/change-tracking-helpers";

export function watchDirectory(
  root: string,
  onChange: (next: Hashes) => void,
  onError: (error: Error) => void
): () => void {
  const timestamps: { [path: string]: number } = {};
  const hashes: { [path: string]: string } = {};

  let ready = false;

  let timeout: null | NodeJS.Timeout = null;

  const normalizePath = (filePath: string): string =>
    filePath.replace(/\\/g, `/`);

  const invalidate = (): void => {
    if (ready) {
      if (timeout !== null) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        timeout = null;
        onChange({ ...hashes });
      }, 250);
    }
  };

  const handle = async (
    filePath: string,
    stats: undefined | fs.Stats
  ): Promise<void> => {
    filePath = normalizePath(filePath);

    if (pathAccepted(filePath)) {
      stats = stats as fs.Stats;

      timestamps[filePath] = stats.mtimeMs;

      const hash = await hashFile(path.join(root, filePath));

      // We have no way to reliably not hit these conditions in tests.
      /* istanbul ignore else */
      if (Object.prototype.hasOwnProperty.call(timestamps, filePath)) {
        /* istanbul ignore else */
        if (timestamps[filePath] === stats.mtimeMs) {
          if (
            !Object.prototype.hasOwnProperty.call(hashes, filePath) ||
            hash !== hashes[filePath]
          ) {
            hashes[filePath] = hash;
            invalidate();
          }
        }
      }
    }
  };

  const watcher = chokidar
    .watch(".", {
      cwd: root,
      alwaysStat: true,
      usePolling: true,
    })
    .on(`add`, async (path, stats) => {
      await handle(path, stats);
    })
    .on(`change`, async (path, stats) => {
      await handle(path, stats);
    })
    .on(`unlink`, (path) => {
      path = normalizePath(path);

      if (pathAccepted(path)) {
        delete timestamps[path];
        delete hashes[path];
        invalidate();
      }
    })
    .on(`ready`, () => {
      ready = true;
      invalidate();
    })

    // NOTE: This has no test coverage, as I am not aware of any way to trigger it intentionally.
    .on(`error`, onError);

  return (): void => {
    watcher.close();
  };
}
