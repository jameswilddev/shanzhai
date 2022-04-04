import * as favicons from "favicons";
import { Input, ActionStep, Output } from "@shanzhai/interfaces";

/**
 * An {@link ActionStep} which parses generates favicons (files and HTML headers) from an input image.
 */
export class FaviconsStep extends ActionStep {
  /**
   * @param name        A description of the operation being performed.
   * @param favicon     An {@link Input} which supplies the favicon image.
   * @param options     An {@link Input} which supplies the parsed options.
   * @param htmlHeaders An {@link Output} which receives the generates HTML headers.
   * @param files       An {@link Output} which receives the generated files.
   */
  constructor(
    public readonly name: string,
    public readonly favicon: Input<Buffer>,
    public readonly options: Input<favicons.FaviconOptions>,
    public readonly htmlHeaders: Output<string>,
    public readonly files: Output<Record<string, string | Buffer>>
  ) {
    super(name, [...htmlHeaders.effects, ...files.effects]);
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    const favicon = await this.favicon.get();
    const options = await this.options.get();

    const result = await favicons(favicon, options);

    this.htmlHeaders.set(result.html.sort().join(``));

    const files = Object.fromEntries([
      ...result.files.map((file) => [file.name, file.contents]),
      ...result.images.map((image) => [image.name, image.contents]),
    ]);
    this.files.set(files);
  }
}
