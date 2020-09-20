import * as typescript from "typescript";
import { KeyValueStore } from "@shanzhai/key-value-store";
import { RawCsv } from "../../steps/action-steps/csv/raw-csv";
import { KeyedJson } from "../../steps/action-steps/json/convert-json-to-type-script-step";

export const readCsvStore = new KeyValueStore<string, string>(`readCsv`);

export const parsedCsvStore = new KeyValueStore<string, RawCsv>(`parsedCsv`);

export const jsonGeneratedFromCsvStore = new KeyValueStore<string, KeyedJson>(
  `jsonGeneratedFromCsv`
);

export const typeScriptGeneratedFromCsvStore = new KeyValueStore<
  string,
  string
>(`typeScriptGeneratedFromCsv`);

export const typeScriptParsedFromCsvStore = new KeyValueStore<
  string,
  typescript.SourceFile
>(`typeScriptParsedFromCsvStore`);
