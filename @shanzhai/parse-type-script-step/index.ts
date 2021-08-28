import * as typescript from "typescript";
import { Input, Output, ActionStep } from "@shanzhai/interfaces";

/**
 * Parses a TypeScript source file.
 */
export class ParseTypeScriptStep extends ActionStep {
  /**
   * @param name            A description of the operation being performed.
   * @param input           An {@link Input} which supplies the unparsed
   *                        TypeScript source file.
   * @param compilerOptions An {@link Input} which supplies the TypeScript
   *                        compiler options to use.
   * @param output          An {@link Output} which receives the parsed
   *                        TypeScript source file.
   */
  constructor(
    public readonly input: Input<string>,
    public readonly compilerOptions: Input<typescript.CompilerOptions>,
    public readonly fileName: string,
    public readonly output: Output<typescript.SourceFile>
  ) {
    super(`Parse ${JSON.stringify(fileName)} as TypeScript`, output.effects);
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    const input = await this.input.get();

    const options = await this.compilerOptions.get();

    const result = typescript.createSourceFile(
      this.fileName,
      input,
      options.target || typescript.ScriptTarget.ES3,
      false,
      typescript.ScriptKind.TS
    );

    const diagnostics = typescript
      .createProgram({ rootNames: [], options })
      .getSyntacticDiagnostics(result);

    if (diagnostics.length > 0) {
      let output = `Failed to parse TypeScript:`;

      for (const diagnostic of diagnostics) {
        const line =
          diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start).line +
          1;

        const message = typescript.flattenDiagnosticMessageText(
          diagnostic.messageText,
          `\n`,
          1
        );

        output += `\nLine ${line}: ${message}`;
      }

      throw new Error(output);
    }

    await this.output.set(result);
  }
}
