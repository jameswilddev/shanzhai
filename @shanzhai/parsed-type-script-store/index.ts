import * as typescript from "typescript";
import { EphemeralKeyedStore } from "@shanzhai/ephemeral-keyed-store";

export const parsedTypeScriptStore =
  new EphemeralKeyedStore<typescript.SourceFile>(`parsedTypeScriptStore`);
