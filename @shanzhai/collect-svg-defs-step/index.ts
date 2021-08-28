import { Input, Output, ActionStep, Json } from "@shanzhai/interfaces";

/**
 * An {@link ActionStep} which combines a set of SVG defs into a single blob of
 * SVG, with globals for TypeScript for their (generated) IDs.
 */
export class CollectSvgDefsStep extends ActionStep {
  /**
   * @param defs       An {@link Input} for the SVGs to combine as defs.  Each
   *                   must have all IDs stripped, except the root, which must
   *                   have an empty ID.
   * @param typeScript An {@link Output} for generated TypeScript for the AnySvg
   *                   type.
   * @param constants  An {@link Output} for generated TypeScript constants,
   *                   mapping the keys of the given {@link defs} to the
   *                   (generated) IDs of the corresponding defs.
   * @param svg        An {@link Output} for the combined defs with injected
   *                   (generated) IDs.
   */
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

  /**
   * @inheritdoc
   */
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
