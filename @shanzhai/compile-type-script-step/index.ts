import * as typescript from "typescript";
import { Input, Output, ActionStep } from "@shanzhai/interfaces";

/**
 * Compiles a set of previously parsed TypeScript files down to a single
 * JavaScript file.
 */
export class CompileTypeScriptStep extends ActionStep {
  /**
   * @param input           An {@link Input} providing an object where the
   *                        values are previously parsed TypeScript files.
   * @param compilerOptions An {@link Input} providing the TypeScript compiler
   *                        options to use.  Must match that used to parse the
   *                        {@link input} files.
   * @param output          An {@link Output} for the (single) JavaScript file
   *                        produced.
   */
  constructor(
    public readonly input: Input<{
      readonly [key: string]: typescript.SourceFile;
    }>,
    public readonly compilerOptions: Input<typescript.CompilerOptions>,
    public readonly output: Output<string>
  ) {
    super(`Compile TypeScript`, output.effects);
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    const inputs = Object.values(await this.input.get());
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
      const writtenFiles = Object.keys(output).sort();

      if (writtenFiles.length < 1) {
        throw new Error(`No files were written.`);
      } else if (writtenFiles.length > 1) {
        throw new Error(
          `Multiple files (${writtenFiles
            .map((file) => JSON.stringify(file))
            .join(`, `)}) were written.`
        );
      }

      await this.output.set(output[writtenFiles[0]]);
    }
  }
}
