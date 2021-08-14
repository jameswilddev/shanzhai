import { CompilerOptions } from "typescript";
import {
  JSONSchemaForTheTypeScriptCompilerSConfigurationFile,
  ReferencesDefinition,
  TsNodeDefinition,
  TypeAcquisitionDefinition,
} from "@schemastore/tsconfig";
import { Input } from "@shanzhai/interfaces";
import { convertCompilerOptions } from "./convert-compiler-options";

export class BuildTsconfigInput
  implements Input<JSONSchemaForTheTypeScriptCompilerSConfigurationFile>
{
  constructor(
    public readonly compilerOptions: Input<undefined | CompilerOptions>,
    public readonly compileOnSave: Input<undefined | boolean>,
    public readonly typeAcquisition: Input<
      TypeAcquisitionDefinition[`typeAcquisition`]
    >,
    public readonly _extends: Input<undefined | string>,
    public readonly tsNode: Input<TsNodeDefinition[`ts-node`]>,
    public readonly files: Input<undefined | ReadonlyArray<string>>,
    public readonly exclude: Input<undefined | ReadonlyArray<string>>,
    public readonly include: Input<undefined | ReadonlyArray<string>>,
    public readonly references: Input<ReferencesDefinition[`references`]>
  ) {}

  async get(): Promise<JSONSchemaForTheTypeScriptCompilerSConfigurationFile> {
    return {
      compilerOptions: convertCompilerOptions(await this.compilerOptions.get()),
      compileOnSave: await this.compileOnSave.get(),
      typeAcquisition: await this.typeAcquisition.get(),
      extends: await this._extends.get(),
      "ts-node": await this.tsNode.get(),
      files: await this.files.get(),
      exclude: await this.exclude.get(),
      include: await this.include.get(),
      references: await this.references.get(),
    };
  }
}
