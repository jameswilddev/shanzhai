export function singleFile<T>(
  execute: (value: T) => Promise<void>,
  onSuccess: () => void,
  onError: (reason: Error) => void
): (value: T) => void {
  let running = false;
  let nextRun: null | [T] = null;

  const checkForNextRun = (): void => {
    if (nextRun === null) {
      running = false;
    } else {
      const value = nextRun[0];
      nextRun = null;

      execute(value).then(
        () => {
          onSuccess();
          checkForNextRun();
        },
        (reason: Error) => {
          onError(reason);
          checkForNextRun();
        }
      );
    }
  };

  return (value: T): void => {
    if (running) {
      nextRun = [value];
    } else {
      running = true;
      execute(value).then(
        () => {
          onSuccess();
          checkForNextRun();
        },
        (reason: Error) => {
          onError(reason);
          checkForNextRun();
        }
      );
    }
  };
}
