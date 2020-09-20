import { Input, Output, ActionStep } from "@shanzhai/interfaces";
import { KeyedJson } from "../../json/convert-json-to-type-script-step";

export type DefEntry = {
  readonly typeScriptName: string;
  readonly content: Input<string>;
};

export class CollectSvgDefsStep extends ActionStep {
  constructor(
    public readonly defs: ReadonlyArray<DefEntry>,
    public readonly typeScript: Output<string>,
    public readonly constants: Output<KeyedJson>,
    public readonly svg: Output<string>
  ) {
    super(`Collect SVG defs`);
  }

  async execute(): Promise<void> {
    if (this.defs.length === 0) {
      this.typeScript.set(`type AnySvg = never;`);
      this.constants.set({});
      this.svg.set(``);
    } else {
      const sortedDefs = this.defs
        .slice()
        .sort((a, b) => a.typeScriptName.localeCompare(b.typeScriptName));

      const typeScript = `type AnySvg = ${sortedDefs
        .map((_, index) => index.toString())
        .join(` | `)};`;

      const constants: { [typeScriptName: string]: number } = {};

      for (let index = 0; index < sortedDefs.length; index++) {
        constants[sortedDefs[index].typeScriptName] = index;
      }

      const svg = sortedDefs
        .map((def, index) => {
          const content = def.content.get();

          const matches = content.match(/(\s)id=""/g);

          if (matches === null || matches.length !== 1) {
            throw new Error(`Failed to inject ID into SVG def.`);
          }

          return content.replace(
            /\sid=""/,
            `${matches[0].slice(0, matches[0].length - 5)}id="${index}"`
          );
        })
        .join(``);

      this.typeScript.set(typeScript);

      this.constants.set(constants);

      this.svg.set(svg);
    }
  }
}
