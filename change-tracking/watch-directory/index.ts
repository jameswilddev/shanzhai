import * as fs from "fs";
import * as chokidar from "chokidar";
import { Timestamps } from "../timestamps";

export function watchDirectory(
  root: string,
  onChange: (next: Timestamps) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    resolve; // This is never resolved.

    const current: { [path: string]: number } = {};

    let ready = false;

    let timeout: null | NodeJS.Timeout = null;

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
      current[path] = stats.mtimeMs;
      invalidate();
    };

    chokidar
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
        delete current[path];
        invalidate();
      })
      .on(`error`, reject)
      .on(`ready`, () => {
        ready = true;
        invalidate();
      });
  });
}
