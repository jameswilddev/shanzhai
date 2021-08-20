import { Input, Output, ActionStep, Json } from "@shanzhai/interfaces";

export class CollectSvgDefsStep extends ActionStep {
  constructor(
    public readonly defs: Input<{ readonly [key: string]: string }>,
    public readonly typeScript: Output<string>,
    public readonly constants: Output<{ readonly [key: string]: Json }>,
    public readonly svg: Output<string>
  ) {
    super(`Collect SVG defs`, [
      ...typeScript.effects,
      ...constants.effects,
      ...svg.effects,
    ]);
  }

  async execute(): Promise<void> {
    const defs = await this.defs.get();

    if (Object.keys(defs).length === 0) {
      await this.typeScript.set(`type AnySvg = never;`);
      await this.constants.set({});
      await this.svg.set(``);
    } else {
      const sortedDefs = Object.entries(defs).sort((a, b) =>
        a[0].localeCompare(b[0])
      );

      const typeScript = `type AnySvg = ${sortedDefs
        .map((_, index) => index.toString())
        .join(` | `)};`;

      const constants: { [typeScriptName: string]: number } = {};

      for (let index = 0; index < sortedDefs.length; index++) {
        constants[sortedDefs[index][0]] = index;
      }

      let svg = ``;

      for (let index = 0; index < sortedDefs.length; index++) {
        const content = await sortedDefs[index][1];

        const matches = content.match(/(\s)id=""/g);

        if (matches === null || matches.length !== 1) {
          throw new Error(`Failed to inject ID into SVG def.`);
        }

        svg += content.replace(
          /\sid=""/,
          `${matches[0].slice(0, matches[0].length - 5)}id="${index}"`
        );
      }

      await this.typeScript.set(typeScript);

      await this.constants.set(constants);

      await this.svg.set(svg);
    }
  }
}
