import * as fs from "fs";
import * as chokidar from "chokidar";
import { Timestamps } from "../timestamps";
import { pathAccepted } from "../path-accepted";

export function watchDirectory(
  root: string,
  onChange: (next: Timestamps) => void,
  onError: (error: Error) => void
): () => void {
  const current: { [path: string]: number } = {};

  let ready = false;

  let timeout: null | NodeJS.Timeout = null;

  const normalizePath = (path: string): string => path.replace(/\\/g, `/`);

  const invalidate = (): void => {
    if (ready) {
      if (timeout !== null) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        timeout = null;
        onChange({ ...current });
      }, 250);
    }
  };

  const handle = (path: string, stats: undefined | fs.Stats): void => {
    path = normalizePath(path);

    if (pathAccepted(path)) {
      stats = stats as fs.Stats;
      current[path] = stats.mtimeMs;
      invalidate();
    }
  };

  const watcher = chokidar
    .watch(".", {
      cwd: root,
      alwaysStat: true,
      usePolling: process.platform === `win32`,
    })
    .on(`add`, (path, stats) => {
      handle(path, stats);
    })
    .on(`change`, (path, stats) => {
      handle(path, stats);
    })
    .on(`unlink`, (path) => {
      path = normalizePath(path);

      if (pathAccepted(path)) {
        delete current[path];
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
