import * as typescript from "typescript";
import { Input, Output, ActionStep } from "@shanzhai/interfaces";

export class CompileTypeScriptStep extends ActionStep {
  constructor(
    public readonly input: Input<ReadonlyArray<typescript.SourceFile>>,
    public readonly compilerOptions: Input<typescript.CompilerOptions>,
    public readonly output: Output<{ readonly [fileName: string]: string }>
  ) {
    super(`Compile TypeScript`);
  }

  async execute(): Promise<void> {
    const inputs = await this.input.get();
    const compilerOptions = await this.compilerOptions.get();
    const options = { ...compilerOptions, noEmitOnError: true };
    const rootNames = inputs.map((sourceFile) => sourceFile.fileName);

    const host = typescript.createCompilerHost({});

    host.getSourceFile = (
      fileName: string,
      languageVersion: typescript.ScriptTarget,
      onError?: (message: string) => void,
      shouldCreateNewSourceFile?: boolean
    ): typescript.SourceFile | undefined => {
      languageVersion;
      onError;
      shouldCreateNewSourceFile;

      return inputs.find((file) => file.fileName === fileName);
    };

    const output: { [fileName: string]: string } = {};

    host.writeFile = (
      fileName: string,
      data: string,
      writeByteOrderMark: boolean,
      onError?: (message: string) => void,
      sourceFiles?: ReadonlyArray<typescript.SourceFile>
    ) => {
      writeByteOrderMark;
      onError;
      sourceFiles;

      output[fileName] = data;
    };

    const program = typescript.createProgram({
      rootNames,
      options,
      projectReferences: undefined,
      host,
      oldProgram: undefined,
      configFileParsingDiagnostics: [],
    });

    const emitResult = program.emit();

    if (emitResult.diagnostics.length > 0) {
      let output = `Failed to compile TypeScript:`;

      for (const diagnostic of emitResult.diagnostics) {
        const file = diagnostic.file as typescript.SourceFile;

        const origin = `${file.fileName}@${
          (file.getLineAndCharacterOfPosition(diagnostic.start as number)
            .line as number) + 1
        }`;

        const message = typescript.flattenDiagnosticMessageText(
          diagnostic.messageText,
          `\n`,
          1
        );

        output += `\n${origin}: ${message.trim()}`;
      }

      throw new Error(output);
    } else {
      await this.output.set(output);
    }
  }
}
