import { pathAccepted } from "..";

describe(`pathAccepted`, () => {
  const scenario = (path: string, expected: boolean): void => {
    describe(`given ${JSON.stringify(path)}`, () => {
      let actual: boolean;

      beforeAll(() => {
        actual = pathAccepted(path);
      });

      it(`returns ${JSON.stringify(expected)}`, () => {
        expect(actual).toEqual(expected);
      });
    });
  };

  scenario(`.`, false);
  scenario(`.abc`, false);
  scenario(`abc`, true);
  scenario(`abc.`, true);
  scenario(`abc.def`, true);
  scenario(`abc.def.`, true);
  scenario(`.abc.def`, false);
  scenario(`.abc.def.`, false);

  scenario(`./ghi`, false);
  scenario(`.abc/ghi`, false);
  scenario(`abc/ghi`, true);
  scenario(`abc./ghi`, true);
  scenario(`abc.def/ghi`, true);
  scenario(`abc.def./ghi`, true);
  scenario(`.abc.def/ghi`, false);
  scenario(`.abc.def./ghi`, false);

  scenario(`abc/.`, false);
  scenario(`abc/.def`, false);
  scenario(`abc/def`, true);
  scenario(`abc/def.`, true);
  scenario(`abc/def.ghi`, true);
  scenario(`abc/def.ghi.`, true);
  scenario(`abc/.def.ghi`, false);
  scenario(`abc/.def.ghi.`, false);

  scenario(`abc/./def`, false);
  scenario(`abc/.def/ghi`, false);
  scenario(`abc/def/ghi`, true);
  scenario(`abc/def./ghi`, true);
  scenario(`abc/def.ghi/jkl`, true);
  scenario(`abc/def.ghi./jkl`, true);
  scenario(`abc/.def.ghi/jkl`, false);
  scenario(`abc/.def.ghi./jkl`, false);
});
