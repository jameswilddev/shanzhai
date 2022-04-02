// eslint-disable-next-line @typescript-eslint/no-var-requires
const parser = require("svgo/lib/parser");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stringifier = require("svgo/lib/stringifier");

import { Input, Output, ActionStep } from "@shanzhai/interfaces";

type ParsedSvg = {
  children: ReadonlyArray<ParsedSvg>;
  readonly attrs: {
    [key: string]: string;
  };
};

/**
 * An {@link ActionStep} which converts a SVG document to a SVG fragment which
 * may be used as a def (when the included blank ID is populated).
 */
export class ConvertSvgDocumentToDefStep extends ActionStep {
  /**
   * @param svgDocument An {@link Input} which provides the SVG document to
   *                    convert to a def.
   * @param svgDef      An {@link Output} which is set to the def generated from
   *                    the given {@link svgDocument}.
   */
  constructor(
    public readonly svgDocument: Input<string>,
    public readonly svgDef: Output<string>
  ) {
    super(`Convert SVG document to def`, svgDef.effects);
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    const svgDocument = await this.svgDocument.get();

    const root = parser.parseSvg(svgDocument) as ParsedSvg;

    const children = root.children[0].children;

    if (children.length === 0) {
      throw new Error(`Empty SVG documents cannot be converted into defs.`);
    }

    if (children.length === 1) {
      // Remove the wrapping <svg> (there's already a single root).
      root.children = children;
    } else {
      // Replace the wrapping <svg> with a <g>.
      const groupSource = parser.parseSvg(`<svg><g></g></svg>`) as ParsedSvg;
      root.children = groupSource.children[0].children;
      groupSource.children[0].children[0].children = children;
    }

    // Inject a blank ID.  This should be safely replaceable later down
    // the line, as we've already filtered out IDs using SVGO.
    const idSource = parser.parseSvg(`<svg id="" />`) as ParsedSvg;
    root.children[0].attrs.id = idSource.children[0].attrs.id;

    const generated = stringifier.stringifySvg(root).data;
    await this.svgDef.set(generated);
  }
}
