import * as typescript from "typescript";
import { Input, Output, ActionStep } from "@shanzhai/interfaces";

export class ParseTypeScriptStep extends ActionStep {
  constructor(
    public readonly input: Input<string>,
    public readonly compilerOptions: Input<typescript.CompilerOptions>,
    public readonly fileName: string,
    public readonly output: Output<typescript.SourceFile>
  ) {
    super(`Parse ${JSON.stringify(fileName)} as TypeScript`);
  }

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
