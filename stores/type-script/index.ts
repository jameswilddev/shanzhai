import * as typescript from "typescript";
import { KeyValueStore } from "../key-value-store";
import { ValueStore } from "../value-store";

export const parsedTypeScriptStore = new KeyValueStore<
  string,
  typescript.SourceFile
>(`parsedTypeScript`);

export const compiledTypeScriptStore = new ValueStore<string>(
  `compiledTypeScriptStore`
);
