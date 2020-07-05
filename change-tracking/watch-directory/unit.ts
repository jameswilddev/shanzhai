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

  describe(`when the directory exists`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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
      expect(onChange).toHaveBeenCalledWith({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a file is added at the root (without timestamp)`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fs.promises.writeFile(path.join(root, `new-file`), Buffer.alloc(0));

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "at-root": 4556363000,
        "new-file": jasmine.any(Number),
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a file is added at the root (with explicit timestamp)`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fs.promises.writeFile(path.join(root, `new-file`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `new-file`), 837924, 495049);

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "at-root": 4556363000,
        "new-file": 495049000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a file at the root is updated`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fs.promises.utimes(path.join(root, `at-root`), 45052507, 9084375);

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "at-root": 9084375000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a file at the root is renamed`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fs.promises.rename(
        path.join(root, `at-root`),
        path.join(root, `new-name`)
      );

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "new-name": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a file at the root is deleted`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fs.promises.unlink(path.join(root, `at-root`));

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a file is added in a subdirectory (without timestamp)`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fs.promises.writeFile(
        path.join(root, `empty-subdirectory`, `new-file`),
        Buffer.alloc(0)
      );

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "at-root": 4556363000,
        "empty-subdirectory/new-file": jasmine.any(Number),
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a file is added in a subdirectory (with explicit timestamp)`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fs.promises.writeFile(
        path.join(root, `empty-subdirectory`, `new-file`),
        Buffer.alloc(0)
      );
      await fs.promises.utimes(
        path.join(root, `empty-subdirectory`, `new-file`),
        837924,
        495049
      );

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "at-root": 4556363000,
        "empty-subdirectory/new-file": 495049000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a file in a subdirectory is updated`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

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

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 9084375000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a file in a subdirectory is renamed`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

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

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "at-root": 4556363000,
        "level-one/level-two/level-three/new-name": 768936000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a file in a subdirectory is deleted`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fs.promises.unlink(
        path.join(
          root,
          `level-one`,
          `level-two`,
          `level-three`,
          `deeply-nested`
        )
      );

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "at-root": 4556363000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when an empty directory is deleted`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fs.promises.rmdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`does not call onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when an empty directory is renamed`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fs.promises.rename(
        path.join(root, `empty-subdirectory`),
        path.join(root, `renamed`)
      );

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`does not call onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when an empty directory is created`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fs.promises.mkdir(path.join(root, `new-directory`));

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`does not call onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when an empty directory is moved`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fs.promises.rename(
        path.join(root, `empty-subdirectory`),
        path.join(root, `level-one`, `renamed`)
      );

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`does not call onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a non-empty directory is deleted`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fs.promises.rmdir(path.join(root, `level-one`, `level-two`), {
        recursive: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "at-root": 4556363000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a non-empty directory is renamed`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fs.promises.rename(
        path.join(root, `level-one`, `level-two`),
        path.join(root, `level-one`, `renamed`)
      );

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "at-root": 4556363000,
        "level-one/renamed/level-three/deeply-nested": 768936000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a non-empty directory is created (without timestamp)`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fs.promises.mkdir(path.join(root, `new-directory`));
      await fs.promises.writeFile(
        path.join(root, `new-directory`, `new-file`),
        Buffer.alloc(0)
      );

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "at-root": 4556363000,
        "new-directory/new-file": jasmine.any(Number),
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a non-empty directory is created (with explicit timestamp)`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

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

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "at-root": 4556363000,
        "new-directory/new-file": 495049000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a non-empty directory is moved`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fs.promises.rename(
        path.join(root, `level-one`, `level-two`),
        path.join(root, `empty-directory`)
      );

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "at-root": 4556363000,
        "empty-directory/level-three/deeply-nested": 768936000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a file is moved between subdirectories`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

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

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "at-root": 4556363000,
        "empty-subdirectory/deeply-nested": 768936000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a file is moved from a subdirectory to the root`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

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

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "at-root": 4556363000,
        "deeply-nested": 768936000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });

  describe(`when a file is moved from the root to a subdirectory`, () => {
    let root: string;
    let onChange: jasmine.Spy;
    let close: () => void;

    beforeAll(async () => {
      root = path.join(os.tmpdir(), uuid.v4());

      await fs.promises.mkdir(root, { recursive: true });

      await fs.promises.writeFile(path.join(root, `at-root`), Buffer.alloc(0));
      await fs.promises.utimes(path.join(root, `at-root`), 8945735, 4556363);

      await fs.promises.mkdir(path.join(root, `empty-subdirectory`), {
        recursive: true,
      });

      await fs.promises.mkdir(
        path.join(root, `level-one`, `level-two`, `level-three`),
        { recursive: true }
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

      onChange = jasmine.createSpy(`onChange`);

      close = watchDirectory(root, onChange);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fs.promises.rename(
        path.join(root, `at-root`),
        path.join(root, `empty-subdirectory`, `at-root`)
      );

      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    afterAll(async () => {
      close();
      await fs.promises.rmdir(root, { recursive: true });
    });

    it(`calls onChange again`, () => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(`calls onChange with the expected object of timestamps`, () => {
      expect(onChange).toHaveBeenCalledWith({
        "empty-subdirectory/at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });

    it(`does not modify the previously presented object of timestamps`, () => {
      expect(onChange.calls.argsFor(0)[0]).toEqual({
        "at-root": 4556363000,
        "level-one/level-two/level-three/deeply-nested": 768936000,
      });
    });
  });
});
