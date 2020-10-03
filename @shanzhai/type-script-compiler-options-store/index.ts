import * as typescript from "typescript";
import { ValueStore } from "@shanzhai/value-store";

export const typeScriptCompilerOptionsStore = new ValueStore<
  typescript.CompilerOptions
>(`typeScriptCompilerOptionsStore`);
