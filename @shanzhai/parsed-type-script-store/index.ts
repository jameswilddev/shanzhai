import * as typescript from "typescript";
import { KeyValueStore } from "@shanzhai/key-value-store";

export const parsedTypeScriptStore = new KeyValueStore<
  string,
  typescript.SourceFile
>(`parsedTypeScriptStore`);
