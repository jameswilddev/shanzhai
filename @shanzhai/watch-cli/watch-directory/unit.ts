import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { watchDirectory } from ".";

describe(`watchDirectory`, () => {
  describe(`when the directory is empty`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let onError: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      onChange = jasmine.createSpy(`onChange`);
      onError = jasmine.createSpy(`onError`);

      close = watchDirectory(root, onChange, onError);

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange once`, () => {
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it(`calls onChange with the expected object of hashes`, () => {
      expect(onChange).toHaveBeenCalledWith({});
    });

    it(`does not call onError`, () => {
      expect(onError).not.toHaveBeenCalled();
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
      let onError: undefined | jasmine.Spy;
      let close: () => void;

      beforeAll(async () => {
        root = path.join(os.tmpdir(), uuid.v4());

        await fs.promises.mkdir(root, { recursive: true });

        await fs.promises.writeFile(
          path.join(root, `at-root`),
          `Test At Root A`
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
          `Test Excluded File A`
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
          `Test Deeply Nested File A`
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
          `Test File Filtered By Parent A`
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
          `Test File Filtered By Parent B`
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
        onError = jasmine.createSpy(`onError`);

        close = watchDirectory(root, onChange, onError);

        await new Promise((resolve) => setTimeout(resolve, 500));

        await arrange(root);

        await new Promise((resolve) => setTimeout(resolve, 500));
      });

      afterAll(async () => {
        close();
        await fs.promises.rmdir(root, { recursive: true });
      });

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "level-one/level-two/level-three/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
        });
      });

      it(`does not modify the previously presented object of hashes`, () => {
        expect((onChange as jasmine.Spy).calls.argsFor(0)[0]).toEqual({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "level-one/level-two/level-three/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
        });
      });

      assert(() => onChange as jasmine.Spy);

      it(`does not call onError`, () => {
        expect(onError).not.toHaveBeenCalled();
      });
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
      await fs.promises.writeFile(
        path.join(root, `new-file`),
        `Test New Added File A`
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "new-file": `5ea602fdd14b83de7a8f8d13967ac15e60c7172a`,
          "level-one/level-two/level-three/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
        });
      });
    }
  );

  scenario(
    `when a file is added at the root (with explicit timestamp)`,
    async (root) => {
      await fs.promises.writeFile(
        path.join(root, `new-file`),
        `Test New Added File A`
      );
      await fs.promises.utimes(path.join(root, `new-file`), 837924, 495049);
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "new-file": `5ea602fdd14b83de7a8f8d13967ac15e60c7172a`,
          "level-one/level-two/level-three/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
        });
      });
    }
  );

  scenario(
    `when a file at the root is updated without making any actual changes`,
    async (root) => {
      await fs.promises.utimes(path.join(root, `at-root`), 45052507, 9084375);
    },
    (onChange) => {
      it(`does not call onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(1);
      });
    }
  );

  scenario(
    `when a file at the root is updated with its contents updated`,
    async (root) => {
      await fs.promises.writeFile(
        path.join(root, `at-root`),
        `Test Updated File`
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `0b94b5c822083c0769696a0938a25b18b2abca57`,
          "level-one/level-two/level-three/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "new-name": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "level-one/level-two/level-three/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "level-one/level-two/level-three/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
        });
      });
    }
  );

  scenario(
    `when a file is added in a subdirectory (without timestamp)`,
    async (root) => {
      await fs.promises.writeFile(
        path.join(root, `empty-subdirectory`, `new-file`),
        `Test New Added File A`
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "empty-subdirectory/new-file": `5ea602fdd14b83de7a8f8d13967ac15e60c7172a`,
          "level-one/level-two/level-three/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
        });
      });
    }
  );

  scenario(
    `when a file is added in a subdirectory (with explicit timestamp)`,
    async (root) => {
      await fs.promises.writeFile(
        path.join(root, `empty-subdirectory`, `new-file`),
        `Test New Added File A`
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "empty-subdirectory/new-file": `5ea602fdd14b83de7a8f8d13967ac15e60c7172a`,
          "level-one/level-two/level-three/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
        });
      });
    }
  );

  scenario(
    `when a file in a subdirectory is updated without making any actual changes`,
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
      it(`does not call onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(1);
      });
    }
  );

  scenario(
    `when a file in a subdirectory is updated with its contents updated`,
    async (root) => {
      await fs.promises.writeFile(
        path.join(
          root,
          `level-one`,
          `level-two`,
          `level-three`,
          `deeply-nested`
        ),
        `Test Updated File`
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "level-one/level-two/level-three/deeply-nested": `0b94b5c822083c0769696a0938a25b18b2abca57`,
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "level-one/level-two/level-three/new-name": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "level-one/renamed/level-three/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
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
        `Test File In New Directory`
      );
    },
    (onChange) => {
      it(`calls onChange again`, () => {
        expect(onChange()).toHaveBeenCalledTimes(2);
      });

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "new-directory/new-file": `e2aed23b59b2c49c27d094d22769aba741ed6b52`,
          "level-one/level-two/level-three/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
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
        `Test File In New Directory`
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "new-directory/new-file": `e2aed23b59b2c49c27d094d22769aba741ed6b52`,
          "level-one/level-two/level-three/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "empty-directory/level-three/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "empty-subdirectory/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "empty-subdirectory/at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "level-one/level-two/level-three/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
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
    `when a filtered file is updated without making any actual changes`,
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
    `when a filtered file is updated with its contents updated`,
    async (root) => {
      await fs.promises.writeFile(
        path.join(root, `level-one`, `level-two`, `.excluded-file`),
        `Test Updated File`
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
        `Test Filtered File`
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "level-one/level-two/level-three/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
          "level-one/level-two/no-longer-excluded-file": `bb46d5a5577afc2a2b87c460ddbbd375a25e445e`,
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
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
        `Test Filtered File`
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "level-one/level-two/level-three/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
          "level-one/level-two/level-three/file-no-longer-filtered": `1705e87d76f3df0de2a14268e353cfe6b9307b27`,
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
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

      it(`calls onChange with the expected object of hashes`, () => {
        expect(onChange()).toHaveBeenCalledWith({
          "at-root": `a0b1afbe9ee172c04204225c23ce16f2da253a79`,
          "level-one/level-two/level-three/deeply-nested": `3e355e8ae075e6f2f7e6b2c799ad0ec8c0b9d7c0`,
          "level-one/now-unfiltered-level-two/file-filtered-by-parent": `8045ef5170be638c49344fc55ac46a62c82da869`,
          "level-one/now-unfiltered-level-two/filtered-level-three/file-filtered-by-parents-parent": `1705e87d76f3df0de2a14268e353cfe6b9307b27`,
        });
      });
    }
  );
});
