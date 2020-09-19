import { plan } from ".";
import { ReadTextFileStep } from "../steps/action-steps/file-system/read-text-file-step";
import { ZipStep } from "../steps/action-steps/file-system/zip-step";
import MinifyHtmlStep from "../steps/action-steps/minification/minify-html-step";
import { NullStep } from "../steps/action-steps/null-step";
import { ParsePugStep } from "../steps/action-steps/pug/parse-pug-step";
import { RenderPugStep } from "../steps/action-steps/pug/render-pug-step";
import { DeleteFromKeyValueStoreStep } from "../steps/action-steps/store-steps/delete-from-key-value-store-step";
import { ParallelStep } from "../steps/aggregation-steps/parallel-step";
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

describe(`plan`, () => {
  describe(`on the first run`, () => {
    let onMappingError: jasmine.Spy;
    let onFilteringError: jasmine.Spy;
    let step: Step;

    beforeAll(() => {
      onMappingError = jasmine.createSpy(`onMappingError`);
      onFilteringError = jasmine.createSpy(`onFilteringError`);

      step = plan(
        {
          added: [
            `file/which/is/not/mappable`,
            `path/to/template-a.pug`,
            `another/file/which/is.unfilterable`,
            `test/invalid-/file.mapping`,
            `unmappable-file`,
            `template-b/path.pug`,
            `file-which/is-not.filterable`,
            `file/which cannot/be.mapped`,
          ],
          changed: [],
          deleted: [],
          unchanged: [],
        },
        true,
        onMappingError,
        onFilteringError
      );
    });

    it(`reports the expected number of mapping errors`, () => {
      expect(onMappingError).toHaveBeenCalledTimes(4);
    });

    it(`reports the expected mapping errors`, () => {
      expect(onMappingError).toHaveBeenCalledWith(`test/invalid-/file.mapping`);
      expect(onMappingError).toHaveBeenCalledWith(`unmappable-file`);
      expect(onMappingError).toHaveBeenCalledWith(`file/which/is/not/mappable`);
      expect(onMappingError).toHaveBeenCalledWith(
        `file/which cannot/be.mapped`
      );
    });

    it(`reports the expected number of filtering errors`, () => {
      expect(onFilteringError).toHaveBeenCalledTimes(2);
    });

    it(`reports the expected filtering errors`, () => {
      expect(onFilteringError).toHaveBeenCalledWith(
        `file-which/is-not.filterable`
      );

      expect(onFilteringError).toHaveBeenCalledWith(
        `another/file/which/is.unfilterable`
      );
    });

    it(`generates the expected step tree`, () => {
      expect(step).toEqual(
        new SerialStep(`Root`, [
          new ParallelStep(`Parse Pug`, [
            new SerialStep(`path/to/template-a.pug`, [
              new ReadTextFileStep(
                [`path/to/template-a.pug`],
                new KeyValueStoreOutput(
                  readTextFileStore,
                  `path/to/template-a.pug`
                )
              ),
              new ParsePugStep(
                `Parse Pug file "path/to/template-a.pug"`,
                new KeyValueStoreInput(
                  readTextFileStore,
                  `path/to/template-a.pug`
                ),
                new KeyValueStoreOutput(
                  parsedPugStore,
                  `path/to/template-a.pug`
                )
              ),
            ]),
            new SerialStep(`template-b/path.pug`, [
              new ReadTextFileStep(
                [`template-b/path.pug`],
                new KeyValueStoreOutput(
                  readTextFileStore,
                  `template-b/path.pug`
                )
              ),
              new ParsePugStep(
                `Parse Pug file "template-b/path.pug"`,
                new KeyValueStoreInput(
                  readTextFileStore,
                  `template-b/path.pug`
                ),
                new KeyValueStoreOutput(parsedPugStore, `template-b/path.pug`)
              ),
            ]),
          ]),
          new ParallelStep(`Render Pug`, [
            new SerialStep(`path/to/template-a.pug`, [
              new RenderPugStep(
                `path/to/template-a.pug`,
                new KeyValueStoreInput(
                  parsedPugStore,
                  `path/to/template-a.pug`
                ),
                new MergeInput({}),
                new KeyValueStoreOutput(
                  renderedPugStore,
                  `path/to/template-a.pug`
                )
              ),
              new MinifyHtmlStep(
                `path/to/template-a.pug`,
                new KeyValueStoreInput(
                  renderedPugStore,
                  `path/to/template-a.pug`
                ),
                new KeyValueStoreOutput(
                  minifiedHtmlStore,
                  `path/to/template-a.pug`
                )
              ),
            ]),
            new SerialStep(`template-b/path.pug`, [
              new RenderPugStep(
                `template-b/path.pug`,
                new KeyValueStoreInput(parsedPugStore, `template-b/path.pug`),
                new MergeInput({}),
                new KeyValueStoreOutput(renderedPugStore, `template-b/path.pug`)
              ),
              new MinifyHtmlStep(
                `template-b/path.pug`,
                new KeyValueStoreInput(renderedPugStore, `template-b/path.pug`),
                new KeyValueStoreOutput(
                  minifiedHtmlStore,
                  `template-b/path.pug`
                )
              ),
            ]),
          ]),
          new ZipStep(
            `Zip`,
            [
              {
                pathSegments: [`path/to/template-a.html`],
                content: new KeyValueStoreInput(
                  minifiedHtmlStore,
                  `path/to/template-a.pug`
                ),
              },
              {
                pathSegments: [`template-b/path.html`],
                content: new KeyValueStoreInput(
                  minifiedHtmlStore,
                  `template-b/path.pug`
                ),
              },
            ],
            new ValueStoreOutput(zipStore)
          ),
        ])
      );
    });
  });

  describe(`on adding a pug file`, () => {
    let onMappingError: jasmine.Spy;
    let onFilteringError: jasmine.Spy;
    let step: Step;

    beforeAll(() => {
      onMappingError = jasmine.createSpy(`onMappingError`);
      onFilteringError = jasmine.createSpy(`onFilteringError`);

      step = plan(
        {
          added: [`template/which-was-added.pug`],
          changed: [],
          deleted: [],
          unchanged: [
            `file/which/is/not/mappable`,
            `path/to/template-a.pug`,
            `another/file/which/is.unfilterable`,
            `test/invalid-/file.mapping`,
            `unmappable-file`,
            `template-b/path.pug`,
            `file-which/is-not.filterable`,
            `file/which cannot/be.mapped`,
          ],
        },
        true,
        onMappingError,
        onFilteringError
      );
    });

    it(`does not report any mapping errors`, () => {
      expect(onMappingError).not.toHaveBeenCalled();
    });

    it(`does not report any filtering errors`, () => {
      expect(onFilteringError).not.toHaveBeenCalled();
    });

    it(`generates the expected step tree`, () => {
      expect(step).toEqual(
        new SerialStep(`Root`, [
          new ParallelStep(`Parse Pug`, [
            new SerialStep(`template/which-was-added.pug`, [
              new ReadTextFileStep(
                [`template/which-was-added.pug`],
                new KeyValueStoreOutput(
                  readTextFileStore,
                  `template/which-was-added.pug`
                )
              ),
              new ParsePugStep(
                `Parse Pug file "template/which-was-added.pug"`,
                new KeyValueStoreInput(
                  readTextFileStore,
                  `template/which-was-added.pug`
                ),
                new KeyValueStoreOutput(
                  parsedPugStore,
                  `template/which-was-added.pug`
                )
              ),
            ]),
          ]),
          new ParallelStep(`Render Pug`, [
            new SerialStep(`template/which-was-added.pug`, [
              new RenderPugStep(
                `template/which-was-added.pug`,
                new KeyValueStoreInput(
                  parsedPugStore,
                  `template/which-was-added.pug`
                ),
                new MergeInput({}),
                new KeyValueStoreOutput(
                  renderedPugStore,
                  `template/which-was-added.pug`
                )
              ),
              new MinifyHtmlStep(
                `template/which-was-added.pug`,
                new KeyValueStoreInput(
                  renderedPugStore,
                  `template/which-was-added.pug`
                ),
                new KeyValueStoreOutput(
                  minifiedHtmlStore,
                  `template/which-was-added.pug`
                )
              ),
            ]),
          ]),
          new ZipStep(
            `Zip`,
            [
              {
                pathSegments: [`template/which-was-added.html`],
                content: new KeyValueStoreInput(
                  minifiedHtmlStore,
                  `template/which-was-added.pug`
                ),
              },
              {
                pathSegments: [`path/to/template-a.html`],
                content: new KeyValueStoreInput(
                  minifiedHtmlStore,
                  `path/to/template-a.pug`
                ),
              },
              {
                pathSegments: [`template-b/path.html`],
                content: new KeyValueStoreInput(
                  minifiedHtmlStore,
                  `template-b/path.pug`
                ),
              },
            ],
            new ValueStoreOutput(zipStore)
          ),
        ])
      );
    });
  });

  describe(`on changing a pug file`, () => {
    let onMappingError: jasmine.Spy;
    let onFilteringError: jasmine.Spy;
    let step: Step;

    beforeAll(() => {
      onMappingError = jasmine.createSpy(`onMappingError`);
      onFilteringError = jasmine.createSpy(`onFilteringError`);

      step = plan(
        {
          added: [],
          changed: [`template/which-was-changed.pug`],
          deleted: [],
          unchanged: [
            `file/which/is/not/mappable`,
            `path/to/template-a.pug`,
            `another/file/which/is.unfilterable`,
            `test/invalid-/file.mapping`,
            `unmappable-file`,
            `template-b/path.pug`,
            `file-which/is-not.filterable`,
            `file/which cannot/be.mapped`,
          ],
        },
        true,
        onMappingError,
        onFilteringError
      );
    });

    it(`does not report any mapping errors`, () => {
      expect(onMappingError).not.toHaveBeenCalled();
    });

    it(`does not report any filtering errors`, () => {
      expect(onFilteringError).not.toHaveBeenCalled();
    });

    it(`generates the expected step tree`, () => {
      expect(step).toEqual(
        new SerialStep(`Root`, [
          new ParallelStep(`Parse Pug`, [
            new SerialStep(`template/which-was-changed.pug`, [
              new DeleteFromKeyValueStoreStep(
                parsedPugStore,
                `template/which-was-changed.pug`
              ),
              new DeleteFromKeyValueStoreStep(
                readTextFileStore,
                `template/which-was-changed.pug`
              ),
              new ReadTextFileStep(
                [`template/which-was-changed.pug`],
                new KeyValueStoreOutput(
                  readTextFileStore,
                  `template/which-was-changed.pug`
                )
              ),
              new ParsePugStep(
                `Parse Pug file "template/which-was-changed.pug"`,
                new KeyValueStoreInput(
                  readTextFileStore,
                  `template/which-was-changed.pug`
                ),
                new KeyValueStoreOutput(
                  parsedPugStore,
                  `template/which-was-changed.pug`
                )
              ),
            ]),
          ]),
          new ParallelStep(`Render Pug`, [
            new SerialStep(`template/which-was-changed.pug`, [
              new DeleteFromKeyValueStoreStep(
                minifiedHtmlStore,
                `template/which-was-changed.pug`
              ),
              new DeleteFromKeyValueStoreStep(
                renderedPugStore,
                `template/which-was-changed.pug`
              ),
              new RenderPugStep(
                `template/which-was-changed.pug`,
                new KeyValueStoreInput(
                  parsedPugStore,
                  `template/which-was-changed.pug`
                ),
                new MergeInput({}),
                new KeyValueStoreOutput(
                  renderedPugStore,
                  `template/which-was-changed.pug`
                )
              ),
              new MinifyHtmlStep(
                `template/which-was-changed.pug`,
                new KeyValueStoreInput(
                  renderedPugStore,
                  `template/which-was-changed.pug`
                ),
                new KeyValueStoreOutput(
                  minifiedHtmlStore,
                  `template/which-was-changed.pug`
                )
              ),
            ]),
          ]),
          new ZipStep(
            `Zip`,
            [
              {
                pathSegments: [`template/which-was-changed.html`],
                content: new KeyValueStoreInput(
                  minifiedHtmlStore,
                  `template/which-was-changed.pug`
                ),
              },
              {
                pathSegments: [`path/to/template-a.html`],
                content: new KeyValueStoreInput(
                  minifiedHtmlStore,
                  `path/to/template-a.pug`
                ),
              },
              {
                pathSegments: [`template-b/path.html`],
                content: new KeyValueStoreInput(
                  minifiedHtmlStore,
                  `template-b/path.pug`
                ),
              },
            ],
            new ValueStoreOutput(zipStore)
          ),
        ])
      );
    });
  });

  describe(`on deleting a pug file`, () => {
    let onMappingError: jasmine.Spy;
    let onFilteringError: jasmine.Spy;
    let step: Step;

    beforeAll(() => {
      onMappingError = jasmine.createSpy(`onMappingError`);
      onFilteringError = jasmine.createSpy(`onFilteringError`);

      step = plan(
        {
          added: [],
          changed: [],
          deleted: [`template/which-was-deleted.pug`],
          unchanged: [
            `file/which/is/not/mappable`,
            `path/to/template-a.pug`,
            `another/file/which/is.unfilterable`,
            `test/invalid-/file.mapping`,
            `unmappable-file`,
            `template-b/path.pug`,
            `file-which/is-not.filterable`,
            `file/which cannot/be.mapped`,
          ],
        },
        true,
        onMappingError,
        onFilteringError
      );
    });

    it(`does not report any mapping errors`, () => {
      expect(onMappingError).not.toHaveBeenCalled();
    });

    it(`does not report any filtering errors`, () => {
      expect(onFilteringError).not.toHaveBeenCalled();
    });

    it(`generates the expected step tree`, () => {
      expect(step).toEqual(
        new SerialStep(`Root`, [
          new ParallelStep(`Parse Pug`, [
            new SerialStep(`template/which-was-deleted.pug`, [
              new DeleteFromKeyValueStoreStep(
                parsedPugStore,
                `template/which-was-deleted.pug`
              ),
              new DeleteFromKeyValueStoreStep(
                readTextFileStore,
                `template/which-was-deleted.pug`
              ),
            ]),
          ]),
          new ParallelStep(`Render Pug`, [
            new SerialStep(`template/which-was-deleted.pug`, [
              new DeleteFromKeyValueStoreStep(
                minifiedHtmlStore,
                `template/which-was-deleted.pug`
              ),
              new DeleteFromKeyValueStoreStep(
                renderedPugStore,
                `template/which-was-deleted.pug`
              ),
            ]),
          ]),
          new ZipStep(
            `Zip`,
            [
              {
                pathSegments: [`path/to/template-a.html`],
                content: new KeyValueStoreInput(
                  minifiedHtmlStore,
                  `path/to/template-a.pug`
                ),
              },
              {
                pathSegments: [`template-b/path.html`],
                content: new KeyValueStoreInput(
                  minifiedHtmlStore,
                  `template-b/path.pug`
                ),
              },
            ],
            new ValueStoreOutput(zipStore)
          ),
        ])
      );
    });
  });

  describe(`on adding a mapping error`, () => {
    let onMappingError: jasmine.Spy;
    let onFilteringError: jasmine.Spy;
    let step: Step;

    beforeAll(() => {
      onMappingError = jasmine.createSpy(`onMappingError`);
      onFilteringError = jasmine.createSpy(`onFilteringError`);

      step = plan(
        {
          added: [`newly/added/mapping/error`],
          changed: [],
          deleted: [],
          unchanged: [
            `file/which/is/not/mappable`,
            `path/to/template-a.pug`,
            `another/file/which/is.unfilterable`,
            `test/invalid-/file.mapping`,
            `unmappable-file`,
            `template-b/path.pug`,
            `file-which/is-not.filterable`,
            `file/which cannot/be.mapped`,
          ],
        },
        true,
        onMappingError,
        onFilteringError
      );
    });

    it(`reports one mapping error`, () => {
      expect(onMappingError).toHaveBeenCalledTimes(1);
    });

    it(`reports the expected mapping error`, () => {
      expect(onMappingError).toHaveBeenCalledWith(`newly/added/mapping/error`);
    });

    it(`does not report any filtering errors`, () => {
      expect(onFilteringError).not.toHaveBeenCalled();
    });

    it(`generates the expected step tree`, () => {
      expect(step).toEqual(new NullStep(`Root`));
    });
  });

  describe(`on changing a mapping error`, () => {
    let onMappingError: jasmine.Spy;
    let onFilteringError: jasmine.Spy;
    let step: Step;

    beforeAll(() => {
      onMappingError = jasmine.createSpy(`onMappingError`);
      onFilteringError = jasmine.createSpy(`onFilteringError`);

      step = plan(
        {
          added: [],
          changed: [`updated/mapping/error`],
          deleted: [],
          unchanged: [
            `file/which/is/not/mappable`,
            `path/to/template-a.pug`,
            `another/file/which/is.unfilterable`,
            `test/invalid-/file.mapping`,
            `unmappable-file`,
            `template-b/path.pug`,
            `file-which/is-not.filterable`,
            `file/which cannot/be.mapped`,
          ],
        },
        true,
        onMappingError,
        onFilteringError
      );
    });

    it(`does not report any mapping errors`, () => {
      expect(onMappingError).not.toHaveBeenCalled();
    });

    it(`does not report any filtering errors`, () => {
      expect(onFilteringError).not.toHaveBeenCalled();
    });

    it(`generates the expected step tree`, () => {
      expect(step).toEqual(new NullStep(`Root`));
    });
  });

  describe(`on deleting a mapping error`, () => {
    let onMappingError: jasmine.Spy;
    let onFilteringError: jasmine.Spy;
    let step: Step;

    beforeAll(() => {
      onMappingError = jasmine.createSpy(`onMappingError`);
      onFilteringError = jasmine.createSpy(`onFilteringError`);

      step = plan(
        {
          added: [],
          changed: [],
          deleted: [`deleted/mapping/error`],
          unchanged: [
            `file/which/is/not/mappable`,
            `path/to/template-a.pug`,
            `another/file/which/is.unfilterable`,
            `test/invalid-/file.mapping`,
            `unmappable-file`,
            `template-b/path.pug`,
            `file-which/is-not.filterable`,
            `file/which cannot/be.mapped`,
          ],
        },
        true,
        onMappingError,
        onFilteringError
      );
    });

    it(`does not report any mapping errors`, () => {
      expect(onMappingError).not.toHaveBeenCalled();
    });

    it(`does not report any filtering errors`, () => {
      expect(onFilteringError).not.toHaveBeenCalled();
    });

    it(`generates the expected step tree`, () => {
      expect(step).toEqual(new NullStep(`Root`));
    });
  });

  describe(`on adding a filtering error`, () => {
    let onMappingError: jasmine.Spy;
    let onFilteringError: jasmine.Spy;
    let step: Step;

    beforeAll(() => {
      onMappingError = jasmine.createSpy(`onMappingError`);
      onFilteringError = jasmine.createSpy(`onFilteringError`);

      step = plan(
        {
          added: [`newly/added/filtering.error`],
          changed: [],
          deleted: [],
          unchanged: [
            `file/which/is/not/mappable`,
            `path/to/template-a.pug`,
            `another/file/which/is.unfilterable`,
            `test/invalid-/file.mapping`,
            `unmappable-file`,
            `template-b/path.pug`,
            `file-which/is-not.filterable`,
            `file/which cannot/be.mapped`,
          ],
        },
        true,
        onMappingError,
        onFilteringError
      );
    });

    it(`does not report any mapping errors`, () => {
      expect(onMappingError).not.toHaveBeenCalled();
    });

    it(`reports one filtering error`, () => {
      expect(onFilteringError).toHaveBeenCalledTimes(1);
    });

    it(`reports the expected filtering error`, () => {
      expect(onFilteringError).toHaveBeenCalledWith(
        `newly/added/filtering.error`
      );
    });

    it(`generates the expected step tree`, () => {
      expect(step).toEqual(new NullStep(`Root`));
    });
  });

  describe(`on changing a filtering error`, () => {
    let onMappingError: jasmine.Spy;
    let onFilteringError: jasmine.Spy;
    let step: Step;

    beforeAll(() => {
      onMappingError = jasmine.createSpy(`onMappingError`);
      onFilteringError = jasmine.createSpy(`onFilteringError`);

      step = plan(
        {
          added: [],
          changed: [`updated/filtering.error`],
          deleted: [],
          unchanged: [
            `file/which/is/not/mappable`,
            `path/to/template-a.pug`,
            `another/file/which/is.unfilterable`,
            `test/invalid-/file.mapping`,
            `unmappable-file`,
            `template-b/path.pug`,
            `file-which/is-not.filterable`,
            `file/which cannot/be.mapped`,
          ],
        },
        true,
        onMappingError,
        onFilteringError
      );
    });

    it(`does not report any mapping errors`, () => {
      expect(onMappingError).not.toHaveBeenCalled();
    });

    it(`does not report any filtering errors`, () => {
      expect(onFilteringError).not.toHaveBeenCalled();
    });

    it(`generates the expected step tree`, () => {
      expect(step).toEqual(new NullStep(`Root`));
    });
  });

  describe(`on deleting a filtering error`, () => {
    let onMappingError: jasmine.Spy;
    let onFilteringError: jasmine.Spy;
    let step: Step;

    beforeAll(() => {
      onMappingError = jasmine.createSpy(`onMappingError`);
      onFilteringError = jasmine.createSpy(`onFilteringError`);

      step = plan(
        {
          added: [],
          changed: [],
          deleted: [`deleted/filtering.error`],
          unchanged: [
            `file/which/is/not/mappable`,
            `path/to/template-a.pug`,
            `another/file/which/is.unfilterable`,
            `test/invalid-/file.mapping`,
            `unmappable-file`,
            `template-b/path.pug`,
            `file-which/is-not.filterable`,
            `file/which cannot/be.mapped`,
          ],
        },
        true,
        onMappingError,
        onFilteringError
      );
    });

    it(`does not report any mapping errors`, () => {
      expect(onMappingError).not.toHaveBeenCalled();
    });

    it(`does not report any filtering errors`, () => {
      expect(onFilteringError).not.toHaveBeenCalled();
    });

    it(`generates the expected step tree`, () => {
      expect(step).toEqual(new NullStep(`Root`));
    });
  });
});
