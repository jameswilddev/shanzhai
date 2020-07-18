import * as typescript from "typescript";
import { KeyValueStore } from "../key-value-store";

export const parsedTypeScriptStore = new KeyValueStore<
  string,
  typescript.SourceFile
>(`parsedTypeScript`);
