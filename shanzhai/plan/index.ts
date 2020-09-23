import { Diff } from "../change-tracking/diff";
import { filterDiff } from "../change-tracking/filter-diff";
import { generateSteps } from "../change-tracking/generate-steps";
import { mapDiff } from "../change-tracking/map-diff";
import { parsePath } from "../change-tracking/parse-path";
import { ReadTextFileStep } from "@shanzhai/read-text-file-step";
import { ZipStep } from "@shanzhai/zip-step";
import { MinifyHtmlStep } from "../steps/action-steps/minification/minify-html-step";
import { ParsePugStep } from "@shanzhai/parse-pug-step";
import { RenderPugStep } from "@shanzhai/render-pug-step";
import { DeleteFromKeyValueStoreStep } from "@shanzhai/key-value-store";
import { SerialStep } from "@shanzhai/serial-step";
import { BuildObjectInput } from "@shanzhai/build-object-input";
import {
  KeyValueStoreInput,
  KeyValueStoreOutput,
} from "@shanzhai/key-value-store";
import { ValueStoreOutput } from "@shanzhai/value-store";
import { Step } from "@shanzhai/interfaces";
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
        new BuildObjectInput({}),
        new KeyValueStoreOutput(renderedPugStore, input.fullPath)
      ),
      new MinifyHtmlStep(
        input.fullPath,
        new KeyValueStoreInput(renderedPugStore, input.fullPath),
        new KeyValueStoreOutput(minifiedHtmlStore, input.fullPath)
      ),
    ]
  );

  const zipSteps =
    renderPugSteps.length > 0
      ? [
          new ZipStep(
            `Zip`,
            new BuildObjectInput(
              Object.fromEntries(
                [
                  ...filteredDiff.diffs.pug.added,
                  ...filteredDiff.diffs.pug.changed,
                  ...filteredDiff.diffs.pug.unchanged,
                ].map((path) => [
                  `${path.fullPathWithoutExtension}.html`,
                  new KeyValueStoreInput(minifiedHtmlStore, path.fullPath),
                ])
              )
            ),
            new ValueStoreOutput(zipStore)
          ),
        ]
      : [];

  return new SerialStep(`Root`, [
    ...parsePugSteps,
    ...renderPugSteps,
    ...zipSteps,
  ]);
};
