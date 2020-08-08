import { parsePath } from ".";

describe(`parsePath`, () => {
  const parses = (
    input: string,
    typeScriptName: string,
    fileExtension: string
  ): void => {
    describe(`given ${JSON.stringify(input)}`, () => {
      let result: null | ParsedPath;

      beforeAll(() => {
        result = parsePath(input);
      });

      it(`returns the expected parsed path`, () => {
        expect(result).toEqual({
          typeScriptName,
          fullPath: input,
          fileExtension,
        });
      });
    });
  };

  const failsToParse = (input: string): void => {
    describe(`given ${JSON.stringify(input)}`, () => {
      let result: null | ParsedPath;

      beforeAll(() => {
        result = parsePath(input);
      });

      it(`returns null`, () => {
        expect(result).toBeNull();
      });
    });
  };

  parses(
    `test-valid-fi$le-na1me.test-file-extension`,
    `testValidFi$leNa1me`,
    `test-file-extension`
  );

  parses(
    `test-d1rec$ory-name/test-valid-fi$le-na1me.test-file-extension`,
    `testD1rec$oryName_testValidFi$leNa1me`,
    `test-file-extension`
  );

  parses(
    `test-parent-d1rec$ory-name/test-ch1ld-direc$ory-name/test-valid-fi$le-na1me.test-file-extension`,
    `testParentD1rec$oryName_testCh1ldDirec$oryName_testValidFi$leNa1me`,
    `test-file-extension`
  );

  failsToParse(
    `test-valid-fi$le-na1me.test-first-file-extension.test-second-file-extension`
  );

  failsToParse(`test-valid-fi$le-na1me`);

  failsToParse(`test-val!d-fi$le-na1me.test-file-extension`);

  failsToParse(`test-valid fi$le-na1me.test-file-extension`);

  failsToParse(`test-valid\tfi$le-na1me.test-file-extension`);

  failsToParse(`test-valid\nfi$le-na1me.test-file-extension`);

  failsToParse(
    `test-d1rec$ory-name/test-valid-fi$le-na!me.test-file-extension`
  );

  failsToParse(
    `test-d1r!c$ory-name/test-valid-fi$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-d1rec$ory-name/test-valid-fi$le-na me.test-file-extension`
  );

  failsToParse(
    `test-d1r c$ory-name/test-valid-fi$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-d1rec$ory-name/test-valid-fi$le-na\nme.test-file-extension`
  );

  failsToParse(
    `test-d1r\nc$ory-name/test-valid-fi$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-d1rec$ory-name/test-valid-fi$le-na\tme.test-file-extension`
  );

  failsToParse(
    `test-d1r\tc$ory-name/test-valid-fi$le-na1me.test-file-extension`
  );

  failsToParse(`test-valid-fi$le-na1me-.test-file-extension`);

  failsToParse(`-test-valid-fi$le-na1me.test-file-extension`);

  failsToParse(
    `test-d1rec$ory-name/test-valid-fi$le-name-.test-file-extension`
  );

  failsToParse(
    `test-d1rec$ory-name/-test-valid-fi$le-name.test-file-extension`
  );

  failsToParse(
    `test-d1rec$ory-name-/test-valid-fi$le-name.test-file-extension`
  );

  failsToParse(
    `-test-d1rec$ory-name/test-valid-fi$le-name.test-file-extension`
  );

  failsToParse(
    `-test-parent-d1rec$ory-name/test-ch1ld-direc$ory-name/test-valid-fi$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-parent-d1rec$ory-name-/test-ch1ld-direc$ory-name/test-valid-fi$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-parent-d1rec$ory-name/-test-ch1ld-direc$ory-name/test-valid-fi$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-parent-d1rec$ory-name/test-ch1ld-direc$ory-name-/test-valid-fi$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-parent-d1rec$ory-name/test-ch1ld-direc$ory-name/-test-valid-fi$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-parent-d1rec$ory-name/test-ch1ld-direc$ory-name/test-valid-fi$le-na1me-.test-file-extension`
  );

  failsToParse(
    `test-parent-d1rec$ory-name/test-ch1ld-direc$ory-name/test-valid-f!$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-parent-d1rec$ory-name/test-ch1!d-direc$ory-name/test-valid-fi$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-par!nt-d1rec$ory-name/test-ch1ld-direc$ory-name/test-valid-fi$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-parent-d1rec$ory-name/test-ch1ld-direc$ory-name/test-valid-f\n$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-parent-d1rec$ory-name/test-ch1\nd-direc$ory-name/test-valid-fi$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-par\nnt-d1rec$ory-name/test-ch1ld-direc$ory-name/test-valid-fi$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-parent-d1rec$ory-name/test-ch1ld-direc$ory-name/test-valid-f\t$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-parent-d1rec$ory-name/test-ch1\td-direc$ory-name/test-valid-fi$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-par\tnt-d1rec$ory-name/test-ch1ld-direc$ory-name/test-valid-fi$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-parent-d1rec$ory-name/test-ch1ld-direc$ory-name/test-valid-f $le-na1me.test-file-extension`
  );

  failsToParse(
    `test-parent-d1rec$ory-name/test-ch1 d-direc$ory-name/test-valid-fi$le-na1me.test-file-extension`
  );

  failsToParse(
    `test-par nt-d1rec$ory-name/test-ch1ld-direc$ory-name/test-valid-fi$le-na1me.test-file-extension`
  );
});
