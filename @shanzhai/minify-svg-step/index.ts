import * as Svgo from "svgo";
import { MinifyStep } from "@shanzhai/minify-step";

const floatPrecision = 0;

const options: Svgo.OptimizeOptions = {
  floatPrecision,
  full: true,
  multipass: true,
  plugins: Svgo.extendDefaultPlugins([
    {
      name: `cleanupAttrs`,
      active: true,
      params: {
        newlines: true,
        trim: true,
        spaces: true,
      },
    },
    {
      name: `mergeStyles`,
      active: true,
    },
    {
      name: `inlineStyles`,
      active: true,
      params: {
        onlyMatchedOnce: true,
        removeMatchedSelectors: true,
        useMqs: ["", "screen"],
        usePseudos: [""],
      },
    },
    {
      name: `removeDoctype`,
      active: true,
    },
    {
      name: `removeXMLProcInst`,
      active: true,
    },
    {
      name: `removeComments`,
      active: true,
    },
    {
      name: `removeMetadata`,
      active: true,
    },
    {
      name: `removeTitle`,
      active: true,
    },
    {
      name: `removeDesc`,
      active: true,
      params: {
        removeAny: true,
      },
    },
    {
      name: `removeUselessDefs`,
      active: true,
    },
    {
      name: `removeXMLNS`,
      active: true,
    },
    {
      name: `removeEditorsNSData`,
      active: true,
      params: {
        additionalNamespaces: [],
      },
    },
    {
      name: `removeEmptyAttrs`,
      active: true,
    },
    {
      name: `removeHiddenElems`,
      active: true,
    },
    {
      name: `removeEmptyText`,
      active: true,
      params: {
        text: true,
        tspan: true,
        tref: true,
      },
    },
    {
      name: `removeEmptyContainers`,
      active: true,
    },
    {
      name: `removeViewBox`,
      active: true,
    },
    {
      name: `cleanupEnableBackground`,
      active: true,
    },
    {
      name: `minifyStyles`,
      active: true,
      params: {
        usage: {
          force: false,
          ids: true,
          classes: true,
          tags: true,
        },
      },
    },
    {
      name: `convertStyleToAttrs`,
      active: true,
      params: {
        keepImportant: false,
      },
    },
    {
      name: `convertColors`,
      active: true,
      params: {
        currentColor: false,
        names2hex: true,
        rgb2hex: true,
        shorthex: true,
        shortname: true,
      },
    },
    {
      name: `convertPathData`,
      active: true,
      params: {
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
    },
    {
      name: `convertTransform`,
      active: true,
      params: {
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
    },
    {
      name: `removeUnknownsAndDefaults`,
      active: true,
      params: {
        unknownContent: true,
        unknownAttrs: true,
        defaultAttrs: true,
        uselessOverrides: true,
        keepDataAttrs: true,
        keepAriaAttrs: true,
        keepRoleAttr: false,
      },
    },
    {
      name: `removeNonInheritableGroupAttrs`,
      active: true,
    },
    {
      name: `removeUselessStrokeAndFill`,
      active: true,
      params: {
        stroke: true,
        fill: true,
        removeNone: false,
        hasStyleOrScript: false,
      },
    },
    {
      name: `removeUnusedNS`,
      active: true,
    },
    {
      name: `prefixIds`,
      active: false,
      params: {
        delim: "__",
        prefixIds: true,
        prefixClassNames: true,
      },
    },
    {
      name: `cleanupIDs`,
      active: true,
      params: {
        remove: true,
        minify: true,
        prefix: "",
        preserve: [],
        preservePrefixes: [],
        force: false,
      },
    },
    {
      name: `cleanupNumericValues`,
      active: true,
      params: {
        floatPrecision,
        leadingZero: true,
        defaultPx: true,
        convertToPx: true,
      },
    },
    {
      name: `cleanupListOfValues`,
      active: true,
      params: {
        floatPrecision,
        leadingZero: true,
        defaultPx: true,
        convertToPx: true,
      },
    },
    {
      name: `moveElemsAttrsToGroup`,
      active: true,
    },
    {
      name: `moveGroupAttrsToElems`,
      active: true,
    },
    {
      name: `collapseGroups`,
      active: true,
    },
    {
      name: `removeRasterImages`,
      active: true,
    },
    {
      name: `mergePaths`,
      active: true,
    },
    {
      name: `convertShapeToPath`,
      active: true,
      params: {
        convertArcs: false,
        floatPrecision,
      },
    },
    {
      name: `convertEllipseToCircle`,
      active: true,
    },
    {
      name: `sortAttrs`,
      active: true,
      params: {
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
    },
    {
      name: `sortDefsChildren`,
      active: true,
    },
    {
      name: `removeDimensions`,
      active: true,
    },
    {
      name: `removeAttrs`,
      active: false,
      params: {
        elemSeparator: `:`,
        preserveCurrentColor: false,
        attrs: [],
      },
    },
    {
      name: `removeAttributesBySelector`,
      active: false,
    },
    {
      name: `removeElementsByAttr`,
      active: false,
      params: {
        id: [],
        class: [],
      },
    },
    {
      name: `addClassesToSVGElement`,
      active: false,
    },
    {
      name: `addAttributesToSVGElement`,
      active: false,
    },
    {
      name: `removeOffCanvasPaths`,
      active: true,
    },
    {
      name: `removeStyleElement`,
      active: true,
    },
    {
      name: `removeScriptElement`,
      active: true,
    },
    {
      name: `reusePaths`,
      active: true,
    },
  ]),
};

export class MinifySvgStep extends MinifyStep<string> {
  readonly maximumIterations = 10;

  async iterate(value: string): Promise<string> {
    const optimized = await Svgo.optimize(value, options);
    return optimized.data;
  }
}
