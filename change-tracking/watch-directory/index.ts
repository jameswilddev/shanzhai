import * as fs from "fs";
import * as chokidar from "chokidar";
import { Timestamps } from "../timestamps";

export function watchDirectory(
  root: string,
  onChange: (next: Timestamps) => void
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
    stats = stats as fs.Stats;
    current[normalizePath(path)] = stats.mtimeMs;
    invalidate();
  };

  const watcher = chokidar
    .watch(".", {
      cwd: root,
      alwaysStat: true,
    })
    .on(`add`, (path, stats) => {
      handle(path, stats);
    })
    .on(`change`, (path, stats) => {
      handle(path, stats);
    })
    .on(`unlink`, (path) => {
      delete current[normalizePath(path)];
      invalidate();
    })
    .on(`ready`, () => {
      ready = true;
      invalidate();
    });

  return (): void => {
    watcher.close();
  };
}
