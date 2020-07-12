import * as typescript from "typescript";
import { ActionStep } from "../../action-step";
import { Input } from "../../../inputs/input";
import { Output } from "../../../outputs/output";
import { compilerOptions } from "../compiler-options";

export class CompileTypeScriptStep extends ActionStep {
  constructor(
    name: string,
    public readonly inputs: ReadonlyArray<Input<typescript.SourceFile>>,
    public readonly output: Output<string>
  ) {
    super(name);
  }

  async execute(): Promise<void> {
    const inputs = this.inputs.map((input) => input.get());
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

      return inputs.find((input) => input.fileName === fileName);
    };

    let written = ``;

    host.writeFile = (
      fileName: string,
      data: string,
      writeByteOrderMark: boolean,
      onError?: (message: string) => void,
      sourceFiles?: ReadonlyArray<typescript.SourceFile>
    ) => {
      fileName;
      writeByteOrderMark;
      onError;
      sourceFiles;

      written = data;
    };

    const program = typescript.createProgram({
      rootNames,
      options: compilerOptions,
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
      this.output.set(written);
    }
  }
}
