// eslint-disable-next-line @typescript-eslint/no-var-requires
const svg2js = require("svgo/lib/svgo/svg2js");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const JS2SVG = require("svgo/lib/svgo/js2svg");

import { Input, Output, ActionStep } from "@shanzhai/interfaces";

type ParsedSvg = {
  children: ReadonlyArray<ParsedSvg>;
  readonly attrs: {
    [key: string]: string;
  };
};

export class ConvertSvgDocumentToDefStep extends ActionStep {
  constructor(
    public readonly svgDocument: Input<string>,
    public readonly svgDef: Output<string>
  ) {
    super(`Convert SVG document to def`, svgDef.effects);
  }

  async execute(): Promise<void> {
    const svgDocument = await this.svgDocument.get();

    const root = svg2js(svgDocument) as ParsedSvg;

    const children = root.children[0].children;

    if (children.length === 0) {
      throw new Error(`Empty SVG documents cannot be converted into defs.`);
    }

    if (children.length === 1) {
      // Remove the wrapping <svg> (there's already a single root).
      root.children = children;
    } else {
      // Replace the wrapping <svg> with a <g>.
      const groupSource = svg2js(`<svg><g></g></svg>`) as ParsedSvg;
      root.children = groupSource.children[0].children;
      groupSource.children[0].children[0].children = children;
    }

    // Inject a blank ID.  This should be safely replaceable later down
    // the line, as we've already filtered out IDs using SVGO.
    const idSource = svg2js(`<svg id="" />`) as ParsedSvg;
    root.children[0].attrs.id = idSource.children[0].attrs.id;

    const generated = new JS2SVG(root).data;
    await this.svgDef.set(generated);
  }
}
