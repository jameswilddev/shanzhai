import * as Svgo from "svgo";
import { MinifyStep } from "@shanzhai/minify-step";

const floatPrecision = 0;

const options: Svgo.OptimizeOptions = {
  floatPrecision,
  full: true,
  multipass: true,
  plugins: [
    {
      name: `preset-default`,
      params: {
        overrides: {
          cleanupAttrs: {
            newlines: true,
            trim: true,
            spaces: true,
          },
          mergeStyles: {},
          inlineStyles: {
            onlyMatchedOnce: true,
            removeMatchedSelectors: true,
            useMqs: ["", "screen"],
            usePseudos: [""],
          },
          removeDoctype: {},
          removeXMLProcInst: {},
          removeComments: {},
          removeMetadata: {},
          removeTitle: {},
          removeDesc: {
            removeAny: true,
          },
          removeUselessDefs: {},
          removeXMLNS: {},
          removeEditorsNSData: {
            additionalNamespaces: [],
          },
          removeEmptyAttrs: {},
          removeHiddenElems: {},
          removeEmptyText: {
            text: true,
            tspan: true,
            tref: true,
          },
          removeEmptyContainers: {},
          removeViewBox: {},
          cleanupEnableBackground: {},
          minifyStyles: {
            usage: {
              force: false,
              ids: true,
              classes: true,
              tags: true,
            },
          },
          convertStyleToAttrs: {
            keepImportant: false,
          },
          convertColors: {
            currentColor: false,
            names2hex: true,
            rgb2hex: true,
            shorthex: true,
            shortname: true,
          },
          convertPathData: {
            applyTransforms: true,
            applyTransformsStroked: true,
            makeArcs: {
              threshold: 2.5,
              tolerance: 0.5,
            },
            straightCurves: true,
            lineShorthands: true,
            curveSmoothShorthands: true,
            floatPrecision,
            transformPrecision: floatPrecision,
            removeUseless: true,
            collapseRepeated: true,
            utilizeAbsolute: true,
            leadingZero: true,
            negativeExtraSpace: true,
            noSpaceAfterFlags: true,
            forceAbsolutePath: false,
          },
          convertTransform: {
            convertToShorts: true,
            floatPrecision,
            transformPrecision: 5,
            matrixToTransform: true,
            shortTranslate: true,
            shortScale: true,
            shortRotate: true,
            removeUseless: true,
            collapseIntoOne: true,
            leadingZero: true,
            negativeExtraSpace: false,
          },
          removeUnknownsAndDefaults: {
            unknownContent: true,
            unknownAttrs: true,
            defaultAttrs: true,
            uselessOverrides: true,
            keepDataAttrs: true,
            keepAriaAttrs: true,
            keepRoleAttr: false,
          },
          removeNonInheritableGroupAttrs: {},
          removeUselessStrokeAndFill: {
            stroke: true,
            fill: true,
            removeNone: false,
            hasStyleOrScript: false,
          },
          removeUnusedNS: {},
          prefixIds: false,
          cleanupIDs: {
            remove: true,
            minify: true,
            prefix: "",
            preserve: [],
            preservePrefixes: [],
            force: false,
          },
          cleanupNumericValues: {
            floatPrecision,
            leadingZero: true,
            defaultPx: true,
            convertToPx: true,
          },
          cleanupListOfValues: {
            floatPrecision,
            leadingZero: true,
            defaultPx: true,
            convertToPx: true,
          },
          moveElemsAttrsToGroup: {},
          moveGroupAttrsToElems: {},
          collapseGroups: {},
          removeRasterImages: {},
          convertShapeToPath: {
            convertArcs: false,
            floatPrecision,
          },
          convertEllipseToCircle: {},
          sortAttrs: {
            order: [
              `id`,
              `width`,
              `height`,
              `x`,
              `x1`,
              `x2`,
              `y`,
              `y1`,
              `y2`,
              `cx`,
              `cy`,
              `r`,
              `fill`,
              `stroke`,
              `marker`,
              `d`,
              `points`,
            ],
          },
          sortDefsChildren: {},
          removeDimensions: {},
          removeAttrs: false,
          removeAttributesBySelector: false,
          removeElementsByAttr: false,
          addClassesToSVGElement: false,
          addAttributesToSVGElement: false,
          removeOffCanvasPaths: {},
          removeStyleElement: {},
          removeScriptElement: {},
          reusePaths: {},
        },
      },
    },
    `mergePaths`,
  ] as unknown as Svgo.Plugin[],
};

/**
 * Minifies SVG.
 */
export class MinifySvgStep extends MinifyStep<string> {
  /**
   * @inheritdoc
   */
  readonly maximumIterations = 10;

  /**
   * @inheritdoc
   */
  async iterate(value: string): Promise<string> {
    const optimized = await Svgo.optimize(value, options);

    if (optimized.error === undefined) {
      return optimized.data;
    } else {
      throw new Error(`Failed to optimize SVG: ${optimized.error}.`);
    }
  }
}
