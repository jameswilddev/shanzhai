import * as typescript from "typescript";
import { EphemeralUnkeyedStore } from "@shanzhai/ephemeral-unkeyed-store";

export const typeScriptCompilerOptionsStore =
  new EphemeralUnkeyedStore<typescript.CompilerOptions>(
    `typeScriptCompilerOptionsStore`
  );
