import { CompilerOptions } from "typescript";
import {
  JSONSchemaForTheTypeScriptCompilerSConfigurationFile,
  ReferencesDefinition,
  TsNodeDefinition,
  TypeAcquisitionDefinition,
} from "@schemastore/tsconfig";
import { Input } from "@shanzhai/interfaces";
import { convertCompilerOptions } from "./convert-compiler-options";

/**
 * An {@link Input} which builds JSON as would be found in a tsconfig.json file
 * from nested {@link Input}s providing {@link CompilerOptions} and any other
 * information.
 */
export class BuildTsconfigInput
  implements Input<JSONSchemaForTheTypeScriptCompilerSConfigurationFile>
{
  /**
   * @param compilerOptions An {@link Input} providing the
   *                        {@link CompilerOptions} to include (or undefined
   *                        when none is to be included.
   * @param compileOnSave   An {@link Input} specifying the value of the
   *                        "compileOnSave" property (or undefined when none is
   *                        to be included).
   * @param typeAcquisition An {@link Input} specifying the value of the
   *                        "typeAcquisition" property (or undefined when none
   *                        is to be included).
   * @param _extends        An {@link Input} specifying the value of the
   *                        "extends" property (or undefined when none is to be
   *                        included).
   * @param tsNode          An {@link Input} specifying the value of the
   *                        "tsNode" property (or undefined when none is to be
   *                        included).
   * @param files           An {@link Input} specifying the value of the "files"
   *                        property (or undefined when none is to be included).
   * @param exclude         An {@link Input} specifying the value of the
   *                        "exclude" property (or undefined when none is to be
   *                        included).
   * @param include         An {@link Input} specifying the value of the
   *                        "include" property (or undefined when none is to be
   *                        included).
   * @param references      An {@link Input} specifying the value of the
   *                        "references" property (or undefined when none is to
   *                        be included).
   */
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

  /**
   * @inheritdoc
   */
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
