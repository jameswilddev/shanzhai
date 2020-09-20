import { parsePath } from ".";
import { ParsedPath } from "@shanzhai/interfaces";

describe(`parsePath`, () => {
  const parses = (
    input: string,
    typeScriptName: string,
    fileExtension: string,
    fullPathWithoutExtension: string
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
          fullPathWithoutExtension,
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
    `test-file-extension`,
    `test-valid-fi$le-na1me`
  );

  parses(`t.e`, `t`, `e`, `t`);
  parses(`tq.er`, `tq`, `er`, `tq`);
  parses(`tqz.erv`, `tqz`, `erv`, `tqz`);

  parses(
    `test-d1rec$ory-name/test-valid-fi$le-na1me.test-file-extension`,
    `testD1rec$oryName_testValidFi$leNa1me`,
    `test-file-extension`,
    `test-d1rec$ory-name/test-valid-fi$le-na1me`
  );

  parses(`t/g.e`, `t_g`, `e`, `t/g`);
  parses(`tq/gz.er`, `tq_gz`, `er`, `tq/gz`);
  parses(`tqz/bxv.erv`, `tqz_bxv`, `erv`, `tqz/bxv`);

  parses(
    `test-parent-d1rec$ory-name/test-ch1ld-direc$ory-name/test-valid-fi$le-na1me.test-file-extension`,
    `testParentD1rec$oryName_testCh1ldDirec$oryName_testValidFi$leNa1me`,
    `test-file-extension`,
    `test-parent-d1rec$ory-name/test-ch1ld-direc$ory-name/test-valid-fi$le-na1me`
  );

  parses(`t/g/y.e`, `t_g_y`, `e`, `t/g/y`);
  parses(`tq/gz/yd.er`, `tq_gz_yd`, `er`, `tq/gz/yd`);
  parses(`tqz/bxv/hsa.erv`, `tqz_bxv_hsa`, `erv`, `tqz/bxv/hsa`);

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
