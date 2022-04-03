import { Writable } from "stream";
import { ActionStep } from "@shanzhai/interfaces";
import { SerialStep } from "@shanzhai/serial-step";
import { execute } from ".";

class LogOutput extends Writable {
  readonly columns = 120;

  cursorTo(): void {
    // Stub.
  }

  clearLine(): void {
    this.accumulated += `\n`;
  }

  accumulated = ``;

  write(
    chunk: unknown,
    encoding?: BufferEncoding | ((error: Error | null | undefined) => void),
    callback?: (error: Error | null | undefined) => void
  ): boolean {
    if (typeof chunk === `string`) {
      this.accumulated += chunk;
    } else if (typeof chunk === `object` && chunk !== null) {
      this.accumulated += chunk.toString();
    } else if (chunk !== null) {
      throw new Error(`Unexpected write chunk ${typeof chunk} ${chunk}.`);
    }

    let backPressure: boolean;

    if (encoding instanceof Function || encoding === undefined) {
      backPressure = super.write(chunk, encoding);
    } else if (typeof encoding === `string`) {
      backPressure = super.write(chunk, encoding, callback);
    } else {
      throw new Error(`Unexpected overload of write ${encoding} ${callback}.`);
    }

    if (!backPressure) this.emit(`drain`);

    return backPressure;
  }

  _write(
    chunk: unknown,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ): void {
    chunk;
    encoding;
    callback;
  }

  end(
    chunk: unknown,
    encoding?: BufferEncoding | (() => void),
    callback?: () => void
  ): this {
    if (typeof chunk === `string`) {
      this.accumulated += chunk;
    } else if (typeof chunk === `object` && chunk !== null) {
      this.accumulated += chunk.toString();
    } else if (chunk !== null) {
      throw new Error(`Unexpected end chunk ${typeof chunk} ${chunk}.`);
    }

    if (encoding instanceof Function || encoding === undefined) {
      super.end(chunk, encoding);
    } else if (typeof encoding === `string`) {
      super.end(chunk, encoding, callback);
    } else {
      throw new Error(`Unexpected overload of end ${encoding} ${callback}.`);
    }
    this.emit(`finish`);

    return this;
  }
}

class UnixLogOutput extends LogOutput {
  constructor(public readonly isTTY: boolean) {
    super();
  }
}

class DummyStep extends ActionStep {
  constructor(readonly name: string, readonly execute: jasmine.Spy) {
    super(name, []);
  }
}

class DelayedPromise {
  constructor() {
    let _resolve: () => void = () => {
      // Temporary function.
    };

    let _reject: (reason: Error) => void = (reason: Error) => {
      reason;
    };

    this.promise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    this.resolve = _resolve;
    this.reject = _reject;
  }

  readonly promise: Promise<void>;
  readonly resolve: () => void;
  readonly reject: (reason: Error) => void;
}

describe(`execute`, () => {
  describe(`when it is not known whether the log output is a TTY`, () => {
    describe(`when there are no steps to execute`, () => {
      let logOutput: LogOutput;
      let result: boolean;

      beforeAll(async () => {
        const step = new SerialStep(`root`, []);

        logOutput = new LogOutput();

        result = await execute(step, logOutput);
      });

      it(`logs that there are no steps to execute`, () => {
        expect(logOutput.accumulated).toEqual(`No steps to execute.
`);
      });

      it(`returns true`, () => {
        expect(result).toBeTrue();
      });
    });

    describe(`when there are steps to execute`, () => {
      describe(`when some steps succeed`, () => {
        let stepA: DummyStep;
        let stepB: DummyStep;
        let stepC: DummyStep;
        let logOutput: LogOutput;
        let resolvedOrRejected: boolean;

        beforeAll(async () => {
          const delayedPromiseA = new DelayedPromise();
          stepA = new DummyStep(
            `stepA`,
            jasmine.createSpy(`stepA`).and.returnValue(delayedPromiseA.promise)
          );
          const delayedPromiseB = new DelayedPromise();
          stepB = new DummyStep(
            `stepB`,
            jasmine.createSpy(`stepB`).and.returnValue(delayedPromiseB.promise)
          );
          const delayedPromiseC = new DelayedPromise();
          stepC = new DummyStep(
            `stepC`,
            jasmine.createSpy(`stepC`).and.returnValue(delayedPromiseC.promise)
          );
          const step = new SerialStep(`root`, [stepA, stepB, stepC]);

          logOutput = new LogOutput();

          resolvedOrRejected = false;
          execute(step, logOutput).then(
            () => {
              resolvedOrRejected = true;
            },
            () => {
              resolvedOrRejected = true;
            }
          );

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseA.resolve();

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });
        }, 30000);

        it(`executes each unblocked step once`, () => {
          expect(stepA.execute).toHaveBeenCalledTimes(1);
          expect(stepB.execute).toHaveBeenCalledTimes(1);
        });

        it(`does not execute blocked steps`, () => {
          expect(stepC.execute).not.toHaveBeenCalled();
        });

        it(`logs all progress`, () => {
          expect(logOutput.accumulated).toEqual(
            `Starting...
0/3 (0%) Starting "stepA"...
1/3 (33%) Step "stepA" completed successfully.
1/3 (33%) Starting "stepB"...
`
          );
        });

        it(`does not resolve or reject`, () => {
          expect(resolvedOrRejected).toBeFalse();
        });
      });

      describe(`when all steps succeed`, () => {
        let stepA: DummyStep;
        let stepB: DummyStep;
        let stepC: DummyStep;
        let logOutput: LogOutput;
        let result: boolean;

        beforeAll(async () => {
          const delayedPromiseA = new DelayedPromise();
          stepA = new DummyStep(
            `stepA`,
            jasmine.createSpy(`stepA`).and.returnValue(delayedPromiseA.promise)
          );
          const delayedPromiseB = new DelayedPromise();
          stepB = new DummyStep(
            `stepB`,
            jasmine.createSpy(`stepB`).and.returnValue(delayedPromiseB.promise)
          );
          const delayedPromiseC = new DelayedPromise();
          stepC = new DummyStep(
            `stepC`,
            jasmine.createSpy(`stepC`).and.returnValue(delayedPromiseC.promise)
          );
          const step = new SerialStep(`root`, [stepA, stepB, stepC]);

          logOutput = new LogOutput();

          const final = execute(step, logOutput);

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseA.resolve();

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseB.resolve();

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseC.resolve();

          result = await final;
        }, 30000);

        it(`executes each step once`, () => {
          expect(stepA.execute).toHaveBeenCalledTimes(1);
          expect(stepB.execute).toHaveBeenCalledTimes(1);
          expect(stepC.execute).toHaveBeenCalledTimes(1);
        });

        it(`logs all progress`, () => {
          expect(logOutput.accumulated).toMatch(
            /^Starting\.\.\.\n0\/3 \(0%\) Starting "stepA"\.\.\.\n1\/3 \(33%\) Step "stepA" completed successfully\.\n1\/3 \(33%\) Starting "stepB"\.\.\.\n2\/3 \(67%\) Step "stepB" completed successfully\.\n2\/3 \(67%\) Starting "stepC"\.\.\.\n3\/3 \(100%\) Step "stepC" completed successfully\.\nDone\.\n$/
          );
        });

        it(`returns true`, () => {
          expect(result).toBeTrue();
        });
      });

      describe(`when a step fails`, () => {
        let stepA: DummyStep;
        let stepB: DummyStep;
        let stepC: DummyStep;
        let logOutput: LogOutput;
        let result: boolean;

        beforeAll(async () => {
          const delayedPromiseA = new DelayedPromise();
          stepA = new DummyStep(
            `stepA`,
            jasmine.createSpy(`stepA`).and.returnValue(delayedPromiseA.promise)
          );
          const delayedPromiseB = new DelayedPromise();
          stepB = new DummyStep(
            `stepB`,
            jasmine.createSpy(`stepB`).and.returnValue(delayedPromiseB.promise)
          );
          const delayedPromiseC = new DelayedPromise();
          stepC = new DummyStep(
            `stepC`,
            jasmine.createSpy(`stepC`).and.returnValue(delayedPromiseC.promise)
          );
          const step = new SerialStep(`root`, [stepA, stepB, stepC]);

          logOutput = new LogOutput();

          const final = execute(step, logOutput);

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseA.resolve();

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseB.reject(new Error(`Test Error`));

          result = await final;
        }, 30000);

        it(`executes each unblocked step once`, () => {
          expect(stepA.execute).toHaveBeenCalledTimes(1);
          expect(stepB.execute).toHaveBeenCalledTimes(1);
        });

        it(`does not execute blocked steps`, () => {
          expect(stepC.execute).not.toHaveBeenCalled();
        });

        it(`logs all progress and the error`, () => {
          expect(logOutput.accumulated).toEqual(
            `Starting...
0/3 (0%) Starting "stepA"...
1/3 (33%) Step "stepA" completed successfully.
1/3 (33%) Starting "stepB"...

Error in step "stepB":
Error: Test Error
`
          );
        });

        it(`returns false`, () => {
          expect(result).toBeFalse();
        });
      });
    });
  });

  describe(`when not logging to a TTY`, () => {
    describe(`when there are no steps to execute`, () => {
      let logOutput: LogOutput;
      let result: boolean;

      beforeAll(async () => {
        const step = new SerialStep(`root`, []);

        logOutput = new UnixLogOutput(false);

        result = await execute(step, logOutput);
      });

      it(`logs that there are no steps to execute`, () => {
        expect(logOutput.accumulated).toEqual(`No steps to execute.
`);
      });

      it(`returns true`, () => {
        expect(result).toBeTrue();
      });
    });

    describe(`when there are steps to execute`, () => {
      describe(`when some steps succeed`, () => {
        let stepA: DummyStep;
        let stepB: DummyStep;
        let stepC: DummyStep;
        let logOutput: LogOutput;
        let resolvedOrRejected: boolean;

        beforeAll(async () => {
          const delayedPromiseA = new DelayedPromise();
          stepA = new DummyStep(
            `stepA`,
            jasmine.createSpy(`stepA`).and.returnValue(delayedPromiseA.promise)
          );
          const delayedPromiseB = new DelayedPromise();
          stepB = new DummyStep(
            `stepB`,
            jasmine.createSpy(`stepB`).and.returnValue(delayedPromiseB.promise)
          );
          const delayedPromiseC = new DelayedPromise();
          stepC = new DummyStep(
            `stepC`,
            jasmine.createSpy(`stepC`).and.returnValue(delayedPromiseC.promise)
          );
          const step = new SerialStep(`root`, [stepA, stepB, stepC]);

          logOutput = new UnixLogOutput(false);

          resolvedOrRejected = false;
          execute(step, logOutput).then(
            () => {
              resolvedOrRejected = true;
            },
            () => {
              resolvedOrRejected = true;
            }
          );

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseA.resolve();

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });
        }, 30000);

        it(`executes each unblocked step once`, () => {
          expect(stepA.execute).toHaveBeenCalledTimes(1);
          expect(stepB.execute).toHaveBeenCalledTimes(1);
        });

        it(`does not execute blocked steps`, () => {
          expect(stepC.execute).not.toHaveBeenCalled();
        });

        it(`logs all progress`, () => {
          expect(logOutput.accumulated).toEqual(
            `Starting...
0/3 (0%) Starting "stepA"...
1/3 (33%) Step "stepA" completed successfully.
1/3 (33%) Starting "stepB"...
`
          );
        });

        it(`does not resolve or reject`, () => {
          expect(resolvedOrRejected).toBeFalse();
        });
      });

      describe(`when all steps succeed`, () => {
        let stepA: DummyStep;
        let stepB: DummyStep;
        let stepC: DummyStep;
        let logOutput: LogOutput;
        let result: boolean;

        beforeAll(async () => {
          const delayedPromiseA = new DelayedPromise();
          stepA = new DummyStep(
            `stepA`,
            jasmine.createSpy(`stepA`).and.returnValue(delayedPromiseA.promise)
          );
          const delayedPromiseB = new DelayedPromise();
          stepB = new DummyStep(
            `stepB`,
            jasmine.createSpy(`stepB`).and.returnValue(delayedPromiseB.promise)
          );
          const delayedPromiseC = new DelayedPromise();
          stepC = new DummyStep(
            `stepC`,
            jasmine.createSpy(`stepC`).and.returnValue(delayedPromiseC.promise)
          );
          const step = new SerialStep(`root`, [stepA, stepB, stepC]);

          logOutput = new UnixLogOutput(false);

          const final = execute(step, logOutput);

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseA.resolve();

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseB.resolve();

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseC.resolve();

          result = await final;
        }, 30000);

        it(`executes each step once`, () => {
          expect(stepA.execute).toHaveBeenCalledTimes(1);
          expect(stepB.execute).toHaveBeenCalledTimes(1);
          expect(stepC.execute).toHaveBeenCalledTimes(1);
        });

        it(`logs all progress`, () => {
          expect(logOutput.accumulated).toMatch(
            /^Starting\.\.\.\n0\/3 \(0%\) Starting "stepA"\.\.\.\n1\/3 \(33%\) Step "stepA" completed successfully\.\n1\/3 \(33%\) Starting "stepB"\.\.\.\n2\/3 \(67%\) Step "stepB" completed successfully\.\n2\/3 \(67%\) Starting "stepC"\.\.\.\n3\/3 \(100%\) Step "stepC" completed successfully\.\nDone\.\n$/
          );
        });

        it(`returns true`, () => {
          expect(result).toBeTrue();
        });
      });

      describe(`when a step fails`, () => {
        let stepA: DummyStep;
        let stepB: DummyStep;
        let stepC: DummyStep;
        let logOutput: LogOutput;
        let result: boolean;

        beforeAll(async () => {
          const delayedPromiseA = new DelayedPromise();
          stepA = new DummyStep(
            `stepA`,
            jasmine.createSpy(`stepA`).and.returnValue(delayedPromiseA.promise)
          );
          const delayedPromiseB = new DelayedPromise();
          stepB = new DummyStep(
            `stepB`,
            jasmine.createSpy(`stepB`).and.returnValue(delayedPromiseB.promise)
          );
          const delayedPromiseC = new DelayedPromise();
          stepC = new DummyStep(
            `stepC`,
            jasmine.createSpy(`stepC`).and.returnValue(delayedPromiseC.promise)
          );
          const step = new SerialStep(`root`, [stepA, stepB, stepC]);

          logOutput = new UnixLogOutput(false);

          const final = execute(step, logOutput);

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseA.resolve();

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseB.reject(new Error(`Test Error`));

          result = await final;
        }, 30000);

        it(`executes each unblocked step once`, () => {
          expect(stepA.execute).toHaveBeenCalledTimes(1);
          expect(stepB.execute).toHaveBeenCalledTimes(1);
        });

        it(`does not execute blocked steps`, () => {
          expect(stepC.execute).not.toHaveBeenCalled();
        });

        it(`logs all progress and the error`, () => {
          expect(logOutput.accumulated).toEqual(
            `Starting...
0/3 (0%) Starting "stepA"...
1/3 (33%) Step "stepA" completed successfully.
1/3 (33%) Starting "stepB"...

Error in step "stepB":
Error: Test Error
`
          );
        });

        it(`returns false`, () => {
          expect(result).toBeFalse();
        });
      });
    });
  });

  describe(`when logging to a TTY`, () => {
    describe(`when there are no steps to execute`, () => {
      let logOutput: LogOutput;
      let result: boolean;

      beforeAll(async () => {
        const step = new SerialStep(`root`, []);

        logOutput = new UnixLogOutput(true);

        result = await execute(step, logOutput);
      });

      it(`logs that there are no steps to execute`, () => {
        expect(logOutput.accumulated).toEqual(`No steps to execute.
`);
      });

      it(`returns true`, () => {
        expect(result).toBeTrue();
      });
    });

    describe(`when there are steps to execute`, () => {
      describe(`when some steps succeed`, () => {
        let stepA: DummyStep;
        let stepB: DummyStep;
        let stepC: DummyStep;
        let logOutput: LogOutput;
        let resolvedOrRejected: boolean;

        beforeAll(async () => {
          const delayedPromiseA = new DelayedPromise();
          stepA = new DummyStep(
            `stepA`,
            jasmine.createSpy(`stepA`).and.returnValue(delayedPromiseA.promise)
          );
          const delayedPromiseB = new DelayedPromise();
          stepB = new DummyStep(
            `stepB`,
            jasmine.createSpy(`stepB`).and.returnValue(delayedPromiseB.promise)
          );
          const delayedPromiseC = new DelayedPromise();
          stepC = new DummyStep(
            `stepC`,
            jasmine.createSpy(`stepC`).and.returnValue(delayedPromiseC.promise)
          );
          const step = new SerialStep(`root`, [stepA, stepB, stepC]);

          logOutput = new UnixLogOutput(true);

          resolvedOrRejected = false;
          execute(step, logOutput).then(
            () => {
              resolvedOrRejected = true;
            },
            () => {
              resolvedOrRejected = true;
            }
          );

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseA.resolve();

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });
        }, 30000);

        it(`executes each unblocked step once`, () => {
          expect(stepA.execute).toHaveBeenCalledTimes(1);
          expect(stepB.execute).toHaveBeenCalledTimes(1);
        });

        it(`does not execute blocked steps`, () => {
          expect(stepC.execute).not.toHaveBeenCalled();
        });

        it(`logs all progress`, () => {
          expect(logOutput.accumulated).toEqual(
            `Starting...
---------------------------------------- 0/3 (0%) 0.0s Starting "stepA"...
=============--------------------------- 1/3 (33%) 0.0s Step "stepA" completed successfully.
=============--------------------------- 1/3 (33%) 0.0s Starting "stepB"...
`
          );
        });

        it(`does not resolve or reject`, () => {
          expect(resolvedOrRejected).toBeFalse();
        });
      });

      describe(`when all steps succeed`, () => {
        let stepA: DummyStep;
        let stepB: DummyStep;
        let stepC: DummyStep;
        let logOutput: LogOutput;
        let result: boolean;

        beforeAll(async () => {
          const delayedPromiseA = new DelayedPromise();
          stepA = new DummyStep(
            `stepA`,
            jasmine.createSpy(`stepA`).and.returnValue(delayedPromiseA.promise)
          );
          const delayedPromiseB = new DelayedPromise();
          stepB = new DummyStep(
            `stepB`,
            jasmine.createSpy(`stepB`).and.returnValue(delayedPromiseB.promise)
          );
          const delayedPromiseC = new DelayedPromise();
          stepC = new DummyStep(
            `stepC`,
            jasmine.createSpy(`stepC`).and.returnValue(delayedPromiseC.promise)
          );
          const step = new SerialStep(`root`, [stepA, stepB, stepC]);

          logOutput = new UnixLogOutput(true);

          const final = execute(step, logOutput);

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseA.resolve();

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseB.resolve();

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseC.resolve();

          result = await final;
        }, 30000);

        it(`executes each step once`, () => {
          expect(stepA.execute).toHaveBeenCalledTimes(1);
          expect(stepB.execute).toHaveBeenCalledTimes(1);
          expect(stepC.execute).toHaveBeenCalledTimes(1);
        });

        it(`logs all progress`, () => {
          expect(logOutput.accumulated).toMatch(
            /^Starting\.\.\.\n---------------------------------------- 0\/3 \(0%\) 0\.0s Starting "stepA"\.\.\.\n=============--------------------------- 1\/3 \(33%\) 0\.0s Step "stepA" completed successfully\.\n=============--------------------------- 1\/3 \(33%\) 0\.0s Starting "stepB"\.\.\.\n===========================------------- 2\/3 \(66%\) \d.\ds Step "stepB" completed successfully\.\n===========================------------- 2\/3 \(66%\) \d\.\ds Starting "stepC"\.\.\.\n======================================== 3\/3 \(100%\) 0\.0s Step "stepC" completed successfully\.\n\nDone\.\n$/
          );
        });

        it(`returns true`, () => {
          expect(result).toBeTrue();
        });
      });

      describe(`when a step fails`, () => {
        let stepA: DummyStep;
        let stepB: DummyStep;
        let stepC: DummyStep;
        let logOutput: LogOutput;
        let result: boolean;

        beforeAll(async () => {
          const delayedPromiseA = new DelayedPromise();
          stepA = new DummyStep(
            `stepA`,
            jasmine.createSpy(`stepA`).and.returnValue(delayedPromiseA.promise)
          );
          const delayedPromiseB = new DelayedPromise();
          stepB = new DummyStep(
            `stepB`,
            jasmine.createSpy(`stepB`).and.returnValue(delayedPromiseB.promise)
          );
          const delayedPromiseC = new DelayedPromise();
          stepC = new DummyStep(
            `stepC`,
            jasmine.createSpy(`stepC`).and.returnValue(delayedPromiseC.promise)
          );
          const step = new SerialStep(`root`, [stepA, stepB, stepC]);

          logOutput = new UnixLogOutput(true);

          const final = execute(step, logOutput);

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseA.resolve();

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });

          delayedPromiseB.reject(new Error(`Test Error`));

          result = await final;
        }, 30000);

        it(`executes each unblocked step once`, () => {
          expect(stepA.execute).toHaveBeenCalledTimes(1);
          expect(stepB.execute).toHaveBeenCalledTimes(1);
        });

        it(`does not execute blocked steps`, () => {
          expect(stepC.execute).not.toHaveBeenCalled();
        });

        it(`logs all progress and the error`, () => {
          expect(logOutput.accumulated).toEqual(
            `Starting...
---------------------------------------- 0/3 (0%) 0.0s Starting "stepA"...
=============--------------------------- 1/3 (33%) 0.0s Step "stepA" completed successfully.
=============--------------------------- 1/3 (33%) 0.0s Starting "stepB"...

Error in step "stepB":
Error: Test Error
`
          );
        });

        it(`returns false`, () => {
          expect(result).toBeFalse();
        });
      });
    });
  });
});
