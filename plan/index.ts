import { Diff } from "../change-tracking/diff";
import { filterDiff } from "../change-tracking/filter-diff";
import { generateSteps } from "../change-tracking/generate-steps";
import { mapDiff } from "../change-tracking/map-diff";
import { parsePath } from "../change-tracking/parse-path";
import { ReadTextFileStep } from "../steps/action-steps/file-system/read-text-file-step";
import { ZipStep } from "../steps/action-steps/file-system/zip-step";
import MinifyHtmlStep from "../steps/action-steps/minification/minify-html-step";
import { NullStep } from "../steps/action-steps/null-step";
import { ParsePugStep } from "../steps/action-steps/pug/parse-pug-step";
import { RenderPugStep } from "../steps/action-steps/pug/render-pug-step";
import { DeleteFromKeyValueStoreStep } from "../steps/action-steps/store-steps/delete-from-key-value-store-step";
import { SerialStep } from "../steps/aggregation-steps/serial-step";
import { KeyValueStoreInput } from "../steps/inputs/key-value-store-input";
import { MergeInput } from "../steps/inputs/merge-input";
import { KeyValueStoreOutput } from "../steps/outputs/key-value-store-output";
import { ValueStoreOutput } from "../steps/outputs/value-store-output";
import { Step } from "../steps/step";
import { minifiedHtmlStore } from "../stores/minified-html-store";
import { parsedPugStore, renderedPugStore } from "../stores/pug";
import { readTextFileStore } from "../stores/read-text-file-store";
import { zipStore } from "../stores/zip-store";

export const plan = (
  diff: Diff<string>,
  firstRun: boolean,
  onMappingError: (path: string) => void,
  onFilteringError: (path: string) => void
): Step => {
  firstRun;

  const mappedDiff = mapDiff(diff, parsePath);

  mappedDiff.errors.forEach((path) => onMappingError(path));

  const extensions: readonly ["pug"] = [`pug`];

  const filteredDiff = filterDiff(
    mappedDiff.diff,
    extensions,
    (input) => input.fileExtension
  );

  filteredDiff.errors.forEach((path) => onFilteringError(path.fullPath));

  if (
    Object.values(filteredDiff.diffs).some(
      (diff) => [...diff.added, ...diff.changed, ...diff.deleted].length > 0
    )
  ) {
    const parsePugSteps = generateSteps(
      `Parse Pug`,
      false,
      filteredDiff.diffs.pug,
      (input) => input.fullPath,
      (input) => [
        new DeleteFromKeyValueStoreStep(parsedPugStore, input.fullPath),
        new DeleteFromKeyValueStoreStep(readTextFileStore, input.fullPath),
      ],
      (input) => [
        new ReadTextFileStep(
          [input.fullPath],
          new KeyValueStoreOutput(readTextFileStore, input.fullPath)
        ),
        new ParsePugStep(
          `Parse Pug file ${JSON.stringify(input.fullPath)}`,
          new KeyValueStoreInput(readTextFileStore, input.fullPath),
          new KeyValueStoreOutput(parsedPugStore, input.fullPath)
        ),
      ]
    );

    const renderPugSteps = generateSteps(
      `Render Pug`,
      false,
      filteredDiff.diffs.pug,
      (input) => input.fullPath,
      (input) => [
        new DeleteFromKeyValueStoreStep(minifiedHtmlStore, input.fullPath),
        new DeleteFromKeyValueStoreStep(renderedPugStore, input.fullPath),
      ],
      (input) => [
        new RenderPugStep(
          input.fullPath,
          new KeyValueStoreInput(parsedPugStore, input.fullPath),
          new MergeInput({}),
          new KeyValueStoreOutput(renderedPugStore, input.fullPath)
        ),
        new MinifyHtmlStep(
          input.fullPath,
          new KeyValueStoreInput(renderedPugStore, input.fullPath),
          new KeyValueStoreOutput(minifiedHtmlStore, input.fullPath)
        ),
      ]
    );

    const zipStep = new ZipStep(
      `Zip`,
      [
        ...filteredDiff.diffs.pug.added,
        ...filteredDiff.diffs.pug.changed,
        ...filteredDiff.diffs.pug.unchanged,
      ].map((path) => ({
        pathSegments: [`${path.fullPathWithoutExtension}.html`],
        content: new KeyValueStoreInput(minifiedHtmlStore, path.fullPath),
      })),
      new ValueStoreOutput(zipStore)
    );

    return new SerialStep(`Root`, [parsePugSteps, renderPugSteps, zipStep]);
  } else {
    return new NullStep(`Root`);
  }
};
