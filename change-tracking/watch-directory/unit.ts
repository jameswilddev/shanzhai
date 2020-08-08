import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { watchDirectory } from ".";

describe(`watchDirectory`, () => {
  describe(`when the directory is empty`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange once`, () => {
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({});
    });
  });

  const scenario = (
    name: string,
    arrange: (root: string) => Promise<void>,
    assert: (onChange: () => jasmine.Spy) => void
  ) => {
    describe(name, () => {
      let root: string;
      let onChange: undefined | jasmine.Spy;
      let close: () => void;

      beforeAll(async () => {
        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(root, { recursive: true });

        await fs.promises.writeFile(
          path.join(root, `at-root`),
          Buffer.alloc(0)
        );
        await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

        await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
          recursive: true,
        });

        await fs.promises.mkdir(
          path.join(root, `level-one`, `level-two`, `level-three`),
          { recursive: true }
        );

        await fs.promises.writeFile(
          path.join(root, `level-one`, `level-two`, `.excluded-file`),
          Buffer.alloc(0)
        );
        await fs.promises.utimes(
          path.join(root, `level-one`, `level-two`, `.excluded-file`),
          342352,
          457895
        );

        await fs.promises.writeFile(
          path.join(
            root,
            `level-one`,
            `level-two`,
            `level-three`,
            `deeply-nested`
          ),
          Buffer.alloc(0)
        );
        await fs.promises.utimes(
          path.join(
            root,
            `level-one`,
            `level-two`,
            `level-three`,
            `deeply-nested`
          ),
          3463789,
          768936
        );

        await fs.promises.mkdir(
          path.join(
            root,
            `level-one`,
            `.filtered-level-two`,
            `filtered-level-three`
          ),
          { recursive: true }
        );

        await fs.promises.writeFile(
          path.join(
            root,
            `level-one`,
            `.filtered-level-two`,
            `file-filtered-by-parent`
          ),
          Buffer.alloc(0)
        );
        await fs.promises.utimes(
          path.join(
            root,
            `level-one`,
            `.filtered-level-two`,
            `file-filtered-by-parent`
          ),
          346346356,
          4757845
        );

        await fs.promises.writeFile(
          path.join(
            root,
            `level-one`,
            `.filtered-level-two`,
            `filtered-level-three`,
            `file-filtered-by-parents-parent`
          ),
          Buffer.alloc(0)
        );
        await fs.promises.utimes(
          path.join(
            root,
            `level-one`,
            `.filtered-level-two`,
            `filtered-level-three`,
            `file-filtered-by-parents-parent`
          ),
          5645626,
          9560733
        );

        onChange = jasmine.createSpy(`onChange`);

        close = watchDirectory(root, onChange);

        await new Promise((resolve) => setTimeout(resolve, 500));

        await arrange(root);

        await new Promise((resolve) => setTimeout(resolve, 500));
      });

      afterAll(async () => {
        close();
        await fs.promises.rmdir(root, { recursive: true });
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange).toHaveBeenCalledWith({
          "at-root": 4556363000,
          "level-one/level-two/level-three/deeply-nested": 768936000,
        });
      });

      it(`does not modify the previously presented object of timestamps`, () => {
        expect((onChange as jasmine.Spy).calls.argsFor(0)[0]).toEqual({
          "at-root": 4556363000,
          "level-one/level-two/level-three/deeply-nested": 768936000,
        });
      });

      assert(() => onChange as jasmine.Spy);
    });
  };

  scenario(
    `when the directory exists`,
    async () => {
      // Nothing to arrange.
    },
    (onChange) => {
      it(`calls onChange once`, () => {
        expect(onChange()).toHaveBeenCalledTimes(1);
      });
    }
  );

  scenario(
    `when a file is added at the root (without timestamp)`,
    async (root) => {
      await fs.promises.writeFile(path.join(root, `new-file`), Buffer.alloc(0));
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
          "new-file": jasmine.any(Number),
          "level-one/level-two/level-three/deeply-nested": 768936000,
        });
      });
    }
  );

  scenario(
    `when a file is added at the root (with explicit timestamp)`,
    async (root) => {
      await fs.promises.writeFile(path.join(root, `new-file`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `new-file`), 837924, 495049);
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
          "new-file": 495049000,
          "level-one/level-two/level-three/deeply-nested": 768936000,
        });
      });
    }
  );

  scenario(
    `when a file at the root is updated`,
    async (root) => {
      await fs.promises.utimes(path.join(root, `at-root`), 45052507, 9084375);
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 9084375000,
          "level-one/level-two/level-three/deeply-nested": 768936000,
        });
      });
    }
  );

  scenario(
    `when a file at the root is renamed`,
    async (root) => {
      await fs.promises.rename(
        path.join(root, `at-root`),
        path.join(root, `new-name`)
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "new-name": 4556363000,
          "level-one/level-two/level-three/deeply-nested": 768936000,
        });
      });
    }
  );

  scenario(
    `when a file at the root is deleted`,
    async (root) => {
      await fs.promises.unlink(path.join(root, `at-root`));
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "level-one/level-two/level-three/deeply-nested": 768936000,
        });
      });
    }
  );

  scenario(
    `when a file is added in a subdirectory (without timestamp)`,
    async (root) => {
      await fs.promises.writeFile(
        path.join(root, `empty-subdirectory`, `new-file`),
        Buffer.alloc(0)
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
          "empty-subdirectory/new-file": jasmine.any(Number),
          "level-one/level-two/level-three/deeply-nested": 768936000,
        });
      });
    }
  );

  scenario(
    `when a file is added in a subdirectory (with explicit timestamp)`,
    async (root) => {
      await fs.promises.writeFile(
        path.join(root, `empty-subdirectory`, `new-file`),
        Buffer.alloc(0)
      );
      await fs.promises.utimes(
        path.join(root, `empty-subdirectory`, `new-file`),
        837924,
        495049
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
          "empty-subdirectory/new-file": 495049000,
          "level-one/level-two/level-three/deeply-nested": 768936000,
        });
      });
    }
  );

  scenario(
    `when a file in a subdirectory is updated`,
    async (root) => {
      await fs.promises.utimes(
        path.join(
          root,
          `level-one`,
          `level-two`,
          `level-three`,
          `deeply-nested`
        ),
        45052507,
        9084375
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
          "level-one/level-two/level-three/deeply-nested": 9084375000,
        });
      });
    }
  );

  scenario(
    `when a file in a subdirectory is renamed`,
    async (root) => {
      await fs.promises.rename(
        path.join(
          root,
          `level-one`,
          `level-two`,
          `level-three`,
          `deeply-nested`
        ),
        path.join(root, `level-one`, `level-two`, `level-three`, `new-name`)
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
          "level-one/level-two/level-three/new-name": 768936000,
        });
      });
    }
  );

  scenario(
    `when a file in a subdirectory is deleted`,
    async (root) => {
      await fs.promises.unlink(
        path.join(
          root,
          `level-one`,
          `level-two`,
          `level-three`,
          `deeply-nested`
        )
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
        });
      });
    }
  );

  scenario(
    `when an empty directory is deleted`,
    async (root) => {
      await fs.promises.rmdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });
    },
    (onChange) => {
      it(`does not call onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(1);
      });
    }
  );

  scenario(
    `when an empty directory is renamed`,
    async (root) => {
      await fs.promises.rename(
        path.join(root, `empty-subdirectory`),
        path.join(root, `renamed`)
      );
    },
    (onChange) => {
      it(`does not call onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(1);
      });
    }
  );

  scenario(
    `when an empty directory is created`,
    async (root) => {
      await fs.promises.mkdir(path.join(root, `new-directory`));
    },
    (onChange) => {
      it(`does not call onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(1);
      });
    }
  );

  scenario(
    `when an empty directory is moved`,
    async (root) => {
      await fs.promises.rename(
        path.join(root, `empty-subdirectory`),
        path.join(root, `level-one`, `renamed`)
      );
    },
    (onChange) => {
      it(`does not call onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(1);
      });
    }
  );

  scenario(
    `when a non-empty directory is deleted`,
    async (root) => {
      await fs.promises.rmdir(path.join(root, `level-one`, `level-two`), {
        recursive: true,
      });
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
        });
      });
    }
  );

  scenario(
    `when a non-empty directory is renamed`,
    async (root) => {
      await fs.promises.rename(
        path.join(root, `level-one`, `level-two`),
        path.join(root, `level-one`, `renamed`)
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
          "level-one/renamed/level-three/deeply-nested": 768936000,
        });
      });
    }
  );

  scenario(
    `when a non-empty directory is created (without timestamp)`,
    async (root) => {
      await fs.promises.mkdir(path.join(root, `new-directory`));
      await fs.promises.writeFile(
        path.join(root, `new-directory`, `new-file`),
        Buffer.alloc(0)
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
          "new-directory/new-file": jasmine.any(Number),
          "level-one/level-two/level-three/deeply-nested": 768936000,
        });
      });
    }
  );

  scenario(
    `when a non-empty directory is created (with explicit timestamp)`,
    async (root) => {
      await fs.promises.mkdir(path.join(root, `new-directory`));
      await fs.promises.writeFile(
        path.join(root, `new-directory`, `new-file`),
        Buffer.alloc(0)
      );
      await fs.promises.utimes(
        path.join(root, `new-directory`, `new-file`),
        837924,
        495049
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
          "new-directory/new-file": 495049000,
          "level-one/level-two/level-three/deeply-nested": 768936000,
        });
      });
    }
  );

  scenario(
    `when a non-empty directory is moved`,
    async (root) => {
      await fs.promises.rename(
        path.join(root, `level-one`, `level-two`),
        path.join(root, `empty-directory`)
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
          "empty-directory/level-three/deeply-nested": 768936000,
        });
      });
    }
  );

  scenario(
    `when a file is moved between subdirectories`,
    async (root) => {
      await fs.promises.rename(
        path.join(
          root,
          `level-one`,
          `level-two`,
          `level-three`,
          `deeply-nested`
        ),
        path.join(root, `empty-subdirectory`, `deeply-nested`)
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
          "empty-subdirectory/deeply-nested": 768936000,
        });
      });
    }
  );

  scenario(
    `when a file is moved from a subdirectory to the root`,
    async (root) => {
      await fs.promises.rename(
        path.join(
          root,
          `level-one`,
          `level-two`,
          `level-three`,
          `deeply-nested`
        ),
        path.join(root, `deeply-nested`)
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
          "deeply-nested": 768936000,
        });
      });
    }
  );

  scenario(
    `when a file is moved from the root to a subdirectory`,
    async (root) => {
      await fs.promises.rename(
        path.join(root, `at-root`),
        path.join(root, `empty-subdirectory`, `at-root`)
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "empty-subdirectory/at-root": 4556363000,
          "level-one/level-two/level-three/deeply-nested": 768936000,
        });
      });
    }
  );

  scenario(
    `when a filtered file is deleted`,
    async (root) => {
      await fs.promises.unlink(
        path.join(root, `level-one`, `level-two`, `.excluded-file`)
      );
    },
    (onChange) => {
      it(`does not call onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(1);
      });
    }
  );

  scenario(
    `when a filtered file is updated`,
    async (root) => {
      await fs.promises.utimes(
        path.join(root, `level-one`, `level-two`, `.excluded-file`),
        45052507,
        9084375
      );
    },
    (onChange) => {
      it(`does not call onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(1);
      });
    }
  );

  scenario(
    `when a filtered file is added`,
    async (root) => {
      await fs.promises.writeFile(
        path.join(root, `level-one`, `level-two`, `.additional-excluded-file`),
        Buffer.alloc(0)
      );
    },
    (onChange) => {
      it(`does not call onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(1);
      });
    }
  );

  scenario(
    `when a filtered file is renamed`,
    async (root) => {
      await fs.promises.rename(
        path.join(root, `level-one`, `level-two`, `.excluded-file`),
        path.join(root, `level-one`, `level-two`, `.renamed-excluded-file`)
      );
    },
    (onChange) => {
      it(`does not call onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(1);
      });
    }
  );

  scenario(
    `when a filtered file is renamed to be unfiltered`,
    async (root) => {
      await fs.promises.rename(
        path.join(root, `level-one`, `level-two`, `.excluded-file`),
        path.join(root, `level-one`, `level-two`, `no-longer-excluded-file`)
      );
    },
    (onChange) => {
      it(`calls onChange again again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
          "level-one/level-two/level-three/deeply-nested": 768936000,
          "level-one/level-two/no-longer-excluded-file": 457895000,
        });
      });
    }
  );

  scenario(
    `when a file is renamed to be filtered`,
    async (root) => {
      await fs.promises.rename(
        path.join(
          root,
          `level-one`,
          `level-two`,
          `level-three`,
          `deeply-nested`
        ),
        path.join(
          root,
          `level-one`,
          `level-two`,
          `level-three`,
          `.filtered-deeply-nested`
        )
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
        });
      });
    }
  );

  scenario(
    `when a file is added to a filtered subdirectory`,
    async (root) => {
      await fs.promises.writeFile(
        path.join(
          root,
          `level-one`,
          `.filtered-level-two`,
          `filtered-level-three`,
          `new-filtered-file`
        ),
        Buffer.alloc(0)
      );
    },
    (onChange) => {
      it(`does not call onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(1);
      });
    }
  );

  scenario(
    `when a file is deleted from a filtered subdirectory`,
    async (root) => {
      await fs.promises.unlink(
        path.join(
          root,
          `level-one`,
          `.filtered-level-two`,
          `filtered-level-three`,
          `file-filtered-by-parents-parent`
        )
      );
    },
    (onChange) => {
      it(`does not call onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(1);
      });
    }
  );

  scenario(
    `when a file is moved from a filtered subdirectory to an unfiltered subdirectory`,
    async (root) => {
      await fs.promises.rename(
        path.join(
          root,
          `level-one`,
          `.filtered-level-two`,
          `filtered-level-three`,
          `file-filtered-by-parents-parent`
        ),
        path.join(
          root,
          `level-one`,
          `level-two`,
          `level-three`,
          `file-no-longer-filtered`
        )
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
          "level-one/level-two/level-three/deeply-nested": 768936000,
          "level-one/level-two/level-three/file-no-longer-filtered": jasmine.any(
            Number
          ),
        });
      });
    }
  );

  scenario(
    `when a file is moved from an unfiltered subdirectory to a filtered subdirectory`,
    async (root) => {
      await fs.promises.rename(
        path.join(
          root,
          `level-one`,
          `level-two`,
          `level-three`,
          `deeply-nested`
        ),
        path.join(
          root,
          `level-one`,
          `.filtered-level-two`,
          `filtered-level-three`,
          `now-filtered`
        )
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
        });
      });
    }
  );

  scenario(
    `when a subdirectory is renamed to be filtered`,
    async (root) => {
      await fs.promises.rename(
        path.join(root, `level-one`, `level-two`),
        path.join(root, `level-one`, `.now-filtered-level-two`)
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
        });
      });
    }
  );

  scenario(
    `when a subdirectory is renamed to be unfiltered`,
    async (root) => {
      await fs.promises.rename(
        path.join(root, `level-one`, `.filtered-level-two`),
        path.join(root, `level-one`, `now-unfiltered-level-two`)
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of timestamps`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": 4556363000,
          "level-one/level-two/level-three/deeply-nested": 768936000,
          "level-one/now-unfiltered-level-two/file-filtered-by-parent": jasmine.any(
            Number
          ),
          "level-one/now-unfiltered-level-two/filtered-level-three/file-filtered-by-parents-parent": jasmine.any(
            Number
          ),
        });
      });
    }
  );
});
