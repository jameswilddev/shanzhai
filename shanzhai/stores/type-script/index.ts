import * as typescript from "typescript";
import { KeyValueStore } from "@shanzhai/key-value-store";
import { ValueStore } from "@shanzhai/value-store";

export const parsedTypeScriptStore = new KeyValueStore<
  string,
  typescript.SourceFile
>(`parsedTypeScript`);

export const compiledTypeScriptStore = new ValueStore<string>(
  `compiledTypeScriptStore`
);
