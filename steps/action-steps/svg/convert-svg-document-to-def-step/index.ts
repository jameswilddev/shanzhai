// eslint-disable-next-line @typescript-eslint/no-var-requires
const svg2js = require("svgo/lib/svgo/svg2js");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const JS2SVG = require("svgo/lib/svgo/js2svg");

import { ActionStep } from "../../action-step";
import { Input } from "../../../inputs/input";
import { Output } from "../../../outputs/output";

type AnySvgElement = SvgElementWithTextContent | SvgElementWithArrayContent;

type SvgElement<TContent> = {
  content: TContent;

  readonly attrs: {
    id: string;
  };
};

type SvgElementWithTextContent = SvgElement<string>;

type SvgElementWithArrayContent = SvgElement<AnySvgElement[]>;

type SvgElementWithArrayOfArraysContent = SvgElement<
  SvgElementWithArrayContent[]
>;

export class ConvertSvgDocumentToDefStep extends ActionStep {
  constructor(
    public readonly svgDocument: Input<string>,
    public readonly svgDef: Output<string>
  ) {
    super(`Convert SVG document to def`);
  }

  async execute(): Promise<void> {
    const svgDocument = this.svgDocument.get();

    const root = await new Promise<AnySvgElement>((resolve) =>
      svg2js(svgDocument, resolve)
    );

    const children = (root as SvgElementWithArrayOfArraysContent).content[0]
      .content;

    if (children === undefined) {
      throw new Error(`Empty SVG documents cannot be converted into defs.`);
    }

    if (children.length === 1) {
      // Remove the wrapping <svg> (there's already a single root).
      root.content = children;
    } else {
      // Replace the wrapping <svg> with a <g>.
      const groupSource = await new Promise<SvgElementWithArrayOfArraysContent>(
        (resolve) => svg2js(`<svg><g></g></svg>`, resolve)
      );
      root.content = groupSource.content[0].content;
      groupSource.content[0].content[0].content = children;
    }

    // Inject a blank ID.  This should be safely replaceable later down
    // the line, as we've already filtered out IDs using SVGO.
    const idSource = await new Promise<SvgElementWithArrayContent>((resolve) =>
      svg2js(`<svg id="" />`, resolve)
    );
    root.content[0].attrs.id = idSource.content[0].attrs.id;

    const generated = new JS2SVG(root).data;
    this.svgDef.set(generated);
  }
}
