# Shanzhai [![Continuous Integration](https://github.com/jameswilddev/shanzhai/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/shanzhai/actions) [![License](https://img.shields.io/github/license/jameswilddev/shanzhai.svg)](https://github.com/jameswilddev/shanzhai/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)

## NPM packages

Name                                                                                                           | Version                                                                                                                                                                                 | Description                                                                                                                                              | Published
-------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------
[@shanzhai/build-object-input](@shanzhai/build-object-input)                                                   | [![0.0.4](https://img.shields.io/npm/v/@shanzhai/build-object-input.svg)](https://www.npmjs.com/package/@shanzhai/build-object-input)                                                   | A Shanzhai input which builds an object from a number of other inputs.                                                                                   | ✔️       
[@shanzhai/build-tsconfig-input](@shanzhai/build-tsconfig-input)                                               | [![0.0.2](https://img.shields.io/npm/v/@shanzhai/build-tsconfig-input.svg)](https://www.npmjs.com/package/@shanzhai/build-tsconfig-input)                                               | A Shanzhai input which converts TypeScript compiler options to JSON as would be found in a tsconfig.json file.                                           | ✔️       
[@shanzhai/change-tracking-helpers](@shanzhai/change-tracking-helpers)                                         | [![0.0.8](https://img.shields.io/npm/v/@shanzhai/change-tracking-helpers.svg)](https://www.npmjs.com/package/@shanzhai/change-tracking-helpers)                                         | Helpers for tracking changes to files during a Shanzhai build.                                                                                           | ✔️       
[@shanzhai/collect-svg-defs-plugin](@shanzhai/collect-svg-defs-plugin)                                         | [![0.0.2](https://img.shields.io/npm/v/@shanzhai/collect-svg-defs-plugin.svg)](https://www.npmjs.com/package/@shanzhai/collect-svg-defs-plugin)                                         | A Shanzhai plugin which collects SVG defs, outputting the results to the Pug locals store, the TypeScript globals store and the TypeScript source store. | ✔️       
[@shanzhai/collect-svg-defs-step](@shanzhai/collect-svg-defs-step)                                             | [![0.0.6](https://img.shields.io/npm/v/@shanzhai/collect-svg-defs-step.svg)](https://www.npmjs.com/package/@shanzhai/collect-svg-defs-step)                                             | A Shanzhai step which collects a number of SVG defs into a single document, and generates TypeScript source which can be used to refer to those defs.    | ✔️       
[@shanzhai/compile-type-script-step](@shanzhai/compile-type-script-step)                                       | [![0.0.6](https://img.shields.io/npm/v/@shanzhai/compile-type-script-step.svg)](https://www.npmjs.com/package/@shanzhai/compile-type-script-step)                                       | A Shanzhai step which compiles parsed TypeScript to Javascript.                                                                                          | ✔️       
[@shanzhai/constant-input](@shanzhai/constant-input)                                                           | [![0.0.4](https://img.shields.io/npm/v/@shanzhai/constant-input.svg)](https://www.npmjs.com/package/@shanzhai/constant-input)                                                           | A Shanzhai input which provides a constant input to a build step.                                                                                        | ✔️       
[@shanzhai/convert-json-to-type-script-step](@shanzhai/convert-json-to-type-script-step)                       | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/convert-json-to-type-script-step.svg)](https://www.npmjs.com/package/@shanzhai/convert-json-to-type-script-step)                       | A Shanzhai step which converts a JSON value to TypeScript source code for ambient declarations.                                                          | ✔️       
[@shanzhai/convert-parsed-csv-to-struct-of-arrays-step](@shanzhai/convert-parsed-csv-to-struct-of-arrays-step) | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/convert-parsed-csv-to-struct-of-arrays-step.svg)](https://www.npmjs.com/package/@shanzhai/convert-parsed-csv-to-struct-of-arrays-step) | A Shanzhai step which converts a parsed CSV file to a "struct-of-arrays" format where each column is its own array.                                      | ✔️       
[@shanzhai/convert-svg-document-to-def-step](@shanzhai/convert-svg-document-to-def-step)                       | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/convert-svg-document-to-def-step.svg)](https://www.npmjs.com/package/@shanzhai/convert-svg-document-to-def-step)                       | A Shanzhai step which converts a SVG document to a def to be embedded in another SVG document.                                                           | ✔️       
[@shanzhai/copy-step](@shanzhai/copy-step)                                                                     | [![0.0.2](https://img.shields.io/npm/v/@shanzhai/copy-step.svg)](https://www.npmjs.com/package/@shanzhai/copy-step)                                                                     | A Shanzhai step which copies an input to an output.                                                                                                      | ✔️       
[@shanzhai/create-directory-step](@shanzhai/create-directory-step)                                             | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/create-directory-step.svg)](https://www.npmjs.com/package/@shanzhai/create-directory-step)                                             | A Shanzhai step which ensures that a directory exists (as well as all of its parent directories).                                                        | ✔️       
[@shanzhai/delete-from-keyed-store-step](@shanzhai/delete-from-keyed-store-step)                               | [![0.0.0](https://img.shields.io/npm/v/@shanzhai/delete-from-keyed-store-step.svg)](https://www.npmjs.com/package/@shanzhai/delete-from-keyed-store-step)                               | A Shanzhai step which deletes a key/value from a keyed store.                                                                                            | ✔️       
[@shanzhai/delete-from-unkeyed-store-step](@shanzhai/delete-from-unkeyed-store-step)                           | [![0.0.0](https://img.shields.io/npm/v/@shanzhai/delete-from-unkeyed-store-step.svg)](https://www.npmjs.com/package/@shanzhai/delete-from-unkeyed-store-step)                           | A Shanzhai step which deletes the value from an unkeyed store.                                                                                           | ✔️       
[@shanzhai/delete-step](@shanzhai/delete-step)                                                                 | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/delete-step.svg)](https://www.npmjs.com/package/@shanzhai/delete-step)                                                                 | A Shanzhai step which deletes a file or directory (including any child files or directories) if it exists.                                               | ✔️       
[@shanzhai/ephemeral-keyed-store](@shanzhai/ephemeral-keyed-store)                                             | [![0.0.0](https://img.shields.io/npm/v/@shanzhai/ephemeral-keyed-store.svg)](https://www.npmjs.com/package/@shanzhai/ephemeral-keyed-store)                                             | A keyed Shanzhai store which holds data in memory until the application closes.                                                                          | ✔️       
[@shanzhai/ephemeral-unkeyed-store](@shanzhai/ephemeral-unkeyed-store)                                         | [![0.0.0](https://img.shields.io/npm/v/@shanzhai/ephemeral-unkeyed-store.svg)](https://www.npmjs.com/package/@shanzhai/ephemeral-unkeyed-store)                                         | An unkeyed Shanzhai store which holds data in memory until the application closes.                                                                       | ✔️       
[@shanzhai/es5-type-script-compiler-options-plugin](@shanzhai/es5-type-script-compiler-options-plugin)         | [![0.0.2](https://img.shields.io/npm/v/@shanzhai/es5-type-script-compiler-options-plugin.svg)](https://www.npmjs.com/package/@shanzhai/es5-type-script-compiler-options-plugin)         | A Shanzhai plugin which loads a set of TypeScript compiler options for ES5.                                                                              | ✔️       
[@shanzhai/execution-helpers](@shanzhai/execution-helpers)                                                     | [![0.0.2](https://img.shields.io/npm/v/@shanzhai/execution-helpers.svg)](https://www.npmjs.com/package/@shanzhai/execution-helpers)                                                     | Helpers which execute a tree of steps to perform a Shanzhai build.                                                                                       | ❌        
[@shanzhai/html-source-store](@shanzhai/html-source-store)                                                     | [![0.0.2](https://img.shields.io/npm/v/@shanzhai/html-source-store.svg)](https://www.npmjs.com/package/@shanzhai/html-source-store)                                                     | A Shanzhai store for HTML source.                                                                                                                        | ✔️       
[@shanzhai/interfaces](@shanzhai/interfaces)                                                                   | [![0.0.18](https://img.shields.io/npm/v/@shanzhai/interfaces.svg)](https://www.npmjs.com/package/@shanzhai/interfaces)                                                                  | TypeScript types used as interfaces between the various components of Shanzhai.                                                                          | ✔️       
[@shanzhai/javascript-source-store](@shanzhai/javascript-source-store)                                         | [![0.0.6](https://img.shields.io/npm/v/@shanzhai/javascript-source-store.svg)](https://www.npmjs.com/package/@shanzhai/javascript-source-store)                                         | A Shanzhai store for Javascript source files.                                                                                                            | ✔️       
[@shanzhai/keyed-store-get-all-input](@shanzhai/keyed-store-get-all-input)                                     | [![0.0.0](https://img.shields.io/npm/v/@shanzhai/keyed-store-get-all-input.svg)](https://www.npmjs.com/package/@shanzhai/keyed-store-get-all-input)                                     | A Shanzhai input which reads all keys and values from a keyed store as an object.                                                                        | ✔️       
[@shanzhai/keyed-store-get-input](@shanzhai/keyed-store-get-input)                                             | [![0.0.0](https://img.shields.io/npm/v/@shanzhai/keyed-store-get-input.svg)](https://www.npmjs.com/package/@shanzhai/keyed-store-get-input)                                             | A Shanzhai input which reads a single value from a keyed store.                                                                                          | ✔️       
[@shanzhai/keyed-store-get-keys-input](@shanzhai/keyed-store-get-keys-input)                                   | [![0.0.0](https://img.shields.io/npm/v/@shanzhai/keyed-store-get-keys-input.svg)](https://www.npmjs.com/package/@shanzhai/keyed-store-get-keys-input)                                   | A Shanzhai input which reads all keys from a keyed store as an array of strings.                                                                         | ✔️       
[@shanzhai/keyed-store-set-output](@shanzhai/keyed-store-set-output)                                           | [![0.0.0](https://img.shields.io/npm/v/@shanzhai/keyed-store-set-output.svg)](https://www.npmjs.com/package/@shanzhai/keyed-store-set-output)                                           | A Shanzhai output which sets a value in a keyed store.                                                                                                   | ✔️       
[@shanzhai/merge-object-input](@shanzhai/merge-object-input)                                                   | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/merge-object-input.svg)](https://www.npmjs.com/package/@shanzhai/merge-object-input)                                                   | A Shanzhai input which builds an object by merging the objects retrieved by other inputs.                                                                | ✔️       
[@shanzhai/minified-javascript-store](@shanzhai/minified-javascript-store)                                     | [![0.0.7](https://img.shields.io/npm/v/@shanzhai/minified-javascript-store.svg)](https://www.npmjs.com/package/@shanzhai/minified-javascript-store)                                     | A Shanzhai store for minified Javascript files.                                                                                                          | ✔️       
[@shanzhai/minified-svg-store](@shanzhai/minified-svg-store)                                                   | [![0.0.1](https://img.shields.io/npm/v/@shanzhai/minified-svg-store.svg)](https://www.npmjs.com/package/@shanzhai/minified-svg-store)                                                   | A Shanzhai store for minified SVG files.                                                                                                                 | ✔️       
[@shanzhai/minify-html-plugin](@shanzhai/minify-html-plugin)                                                   | [![0.0.1](https://img.shields.io/npm/v/@shanzhai/minify-html-plugin.svg)](https://www.npmjs.com/package/@shanzhai/minify-html-plugin)                                                   | A Shanzhai plugin which minifies HTML from the source store.                                                                                             | ❌        
[@shanzhai/minify-html-step](@shanzhai/minify-html-step)                                                       | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/minify-html-step.svg)](https://www.npmjs.com/package/@shanzhai/minify-html-step)                                                       | A Shanzhai step which minifies a HTML file.                                                                                                              | ❌        
[@shanzhai/minify-javascript-step](@shanzhai/minify-javascript-step)                                           | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/minify-javascript-step.svg)](https://www.npmjs.com/package/@shanzhai/minify-javascript-step)                                           | A Shanzhai step which minifies a Javascript file.                                                                                                        | ❌        
[@shanzhai/minify-step](@shanzhai/minify-step)                                                                 | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/minify-step.svg)](https://www.npmjs.com/package/@shanzhai/minify-step)                                                                 | A Shanzhai step which can be built upon to create recursive minification build steps.                                                                    | ✔️       
[@shanzhai/minify-svg-plugin](@shanzhai/minify-svg-plugin)                                                     | [![0.0.0](https://img.shields.io/npm/v/@shanzhai/minify-svg-plugin.svg)](https://www.npmjs.com/package/@shanzhai/minify-svg-plugin)                                                     | A Shanzhai plugin which minifies SVG from the source store.                                                                                              | ❌        
[@shanzhai/minify-svg-step](@shanzhai/minify-svg-step)                                                         | [![0.0.6](https://img.shields.io/npm/v/@shanzhai/minify-svg-step.svg)](https://www.npmjs.com/package/@shanzhai/minify-svg-step)                                                         | A Shanzhai step which minifies a SVG file.                                                                                                               | ❌        
[@shanzhai/null-output](@shanzhai/null-output)                                                                 | [![0.0.4](https://img.shields.io/npm/v/@shanzhai/null-output.svg)](https://www.npmjs.com/package/@shanzhai/null-output)                                                                 | A Shanzhai output which discards any value it is given without taking further action.                                                                    | ✔️       
[@shanzhai/output-type-script-compiler-options-plugin](@shanzhai/output-type-script-compiler-options-plugin)   | [![0.0.2](https://img.shields.io/npm/v/@shanzhai/output-type-script-compiler-options-plugin.svg)](https://www.npmjs.com/package/@shanzhai/output-type-script-compiler-options-plugin)   | A Shanzhai plugin which outputs the current TypeScript compiler options to the current working directory.                                                | ❌        
[@shanzhai/output-zip-content-plugin](@shanzhai/output-zip-content-plugin)                                     | [![0.0.1](https://img.shields.io/npm/v/@shanzhai/output-zip-content-plugin.svg)](https://www.npmjs.com/package/@shanzhai/output-zip-content-plugin)                                     | A Shanzhai plugin which outputs the content of the distributable zip to the dist/content subdirectory of the current working directory.                  | ✔️       
[@shanzhai/output-zip-plugin](@shanzhai/output-zip-plugin)                                                     | [![0.0.1](https://img.shields.io/npm/v/@shanzhai/output-zip-plugin.svg)](https://www.npmjs.com/package/@shanzhai/output-zip-plugin)                                                     | A Shanzhai plugin which outputs the distributable zip to the dist subdirectory of the current working directory.                                         | ✔️       
[@shanzhai/parallel-step](@shanzhai/parallel-step)                                                             | [![0.0.6](https://img.shields.io/npm/v/@shanzhai/parallel-step.svg)](https://www.npmjs.com/package/@shanzhai/parallel-step)                                                             | A Shanzhai build step which runs any number of child build steps in parallel.                                                                            | ✔️       
[@shanzhai/parse-csv-step](@shanzhai/parse-csv-step)                                                           | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/parse-csv-step.svg)](https://www.npmjs.com/package/@shanzhai/parse-csv-step)                                                           | A Shanzhai step which parses CSV files.                                                                                                                  | ✔️       
[@shanzhai/parse-json-step](@shanzhai/parse-json-step)                                                         | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/parse-json-step.svg)](https://www.npmjs.com/package/@shanzhai/parse-json-step)                                                         | A Shanzhai step which parses JSON from a string.                                                                                                         | ✔️       
[@shanzhai/parse-pug-plugin](@shanzhai/parse-pug-plugin)                                                       | [![0.0.0](https://img.shields.io/npm/v/@shanzhai/parse-pug-plugin.svg)](https://www.npmjs.com/package/@shanzhai/parse-pug-plugin)                                                       | A Shanzhai plugin which parses Pug source.                                                                                                               | ✔️       
[@shanzhai/parse-pug-step](@shanzhai/parse-pug-step)                                                           | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/parse-pug-step.svg)](https://www.npmjs.com/package/@shanzhai/parse-pug-step)                                                           | A Shanzhai step which parses Pug files.                                                                                                                  | ✔️       
[@shanzhai/parse-type-script-plugin](@shanzhai/parse-type-script-plugin)                                       | [![0.0.0](https://img.shields.io/npm/v/@shanzhai/parse-type-script-plugin.svg)](https://www.npmjs.com/package/@shanzhai/parse-type-script-plugin)                                       | A Shanzhai plugin which parses TypeScript source files.                                                                                                  | ❌        
[@shanzhai/parse-type-script-step](@shanzhai/parse-type-script-step)                                           | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/parse-type-script-step.svg)](https://www.npmjs.com/package/@shanzhai/parse-type-script-step)                                           | A Shanzhai step which compiles parsed TypeScript.                                                                                                        | ✔️       
[@shanzhai/parsed-pug-store](@shanzhai/parsed-pug-store)                                                       | [![0.0.2](https://img.shields.io/npm/v/@shanzhai/parsed-pug-store.svg)](https://www.npmjs.com/package/@shanzhai/parsed-pug-store)                                                       | A Shanzhai store for parsed Pug.                                                                                                                         | ✔️       
[@shanzhai/parsed-type-script-store](@shanzhai/parsed-type-script-store)                                       | [![0.0.6](https://img.shields.io/npm/v/@shanzhai/parsed-type-script-store.svg)](https://www.npmjs.com/package/@shanzhai/parsed-type-script-store)                                       | A Shanzhai store for parsed TypeScript source files.                                                                                                     | ✔️       
[@shanzhai/planning-helpers](@shanzhai/planning-helpers)                                                       | [![0.0.4](https://img.shields.io/npm/v/@shanzhai/planning-helpers.svg)](https://www.npmjs.com/package/@shanzhai/planning-helpers)                                                       | Helpers which generate a tree of steps to execute to perform a Shanzhai build.                                                                           | ❌        
[@shanzhai/plugin-helpers](@shanzhai/plugin-helpers)                                                           | [![0.0.7](https://img.shields.io/npm/v/@shanzhai/plugin-helpers.svg)](https://www.npmjs.com/package/@shanzhai/plugin-helpers)                                                           | Helpers for searching for plugins during a Shanzhai build.                                                                                               | ✔️       
[@shanzhai/production-cli](@shanzhai/production-cli)                                                           | [![0.0.9](https://img.shields.io/npm/v/@shanzhai/production-cli.svg)](https://www.npmjs.com/package/@shanzhai/production-cli)                                                           | A CLI tool which performs a one-off production build of the Shanzhai project in the current directory.                                                   | ❌        
[@shanzhai/pug-local-store](@shanzhai/pug-local-store)                                                         | [![0.0.2](https://img.shields.io/npm/v/@shanzhai/pug-local-store.svg)](https://www.npmjs.com/package/@shanzhai/pug-local-store)                                                         | A Shanzhai store for locals to be passed to Pug templates.                                                                                               | ✔️       
[@shanzhai/pug-source-store](@shanzhai/pug-source-store)                                                       | [![0.0.2](https://img.shields.io/npm/v/@shanzhai/pug-source-store.svg)](https://www.npmjs.com/package/@shanzhai/pug-source-store)                                                       | A Shanzhai store for Pug source.                                                                                                                         | ✔️       
[@shanzhai/read-binary-file-step](@shanzhai/read-binary-file-step)                                             | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/read-binary-file-step.svg)](https://www.npmjs.com/package/@shanzhai/read-binary-file-step)                                             | A Shanzhai step which reads the content of a binary file.                                                                                                | ✔️       
[@shanzhai/read-pug-files-plugin](@shanzhai/read-pug-files-plugin)                                             | [![0.0.1](https://img.shields.io/npm/v/@shanzhai/read-pug-files-plugin.svg)](https://www.npmjs.com/package/@shanzhai/read-pug-files-plugin)                                             | A Shanzhai plugin which reads PUg files into the Pug source store.                                                                                       | ✔️       
[@shanzhai/read-svg-files-plugin](@shanzhai/read-svg-files-plugin)                                             | [![0.0.1](https://img.shields.io/npm/v/@shanzhai/read-svg-files-plugin.svg)](https://www.npmjs.com/package/@shanzhai/read-svg-files-plugin)                                             | A Shanzhai plugin which reads SVG files into the SVG source store.                                                                                       | ✔️       
[@shanzhai/read-text-file-step](@shanzhai/read-text-file-step)                                                 | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/read-text-file-step.svg)](https://www.npmjs.com/package/@shanzhai/read-text-file-step)                                                 | A Shanzhai step which reads the content of a UTF-8 encoded text file.                                                                                    | ✔️       
[@shanzhai/read-type-script-files-plugin](@shanzhai/read-type-script-files-plugin)                             | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/read-type-script-files-plugin.svg)](https://www.npmjs.com/package/@shanzhai/read-type-script-files-plugin)                             | A Shanzhai plugin which reads TypeScript (*.ts) files into the TypeScript source store.                                                                  | ✔️       
[@shanzhai/render-pug-plugin](@shanzhai/render-pug-plugin)                                                     | [![0.0.2](https://img.shields.io/npm/v/@shanzhai/render-pug-plugin.svg)](https://www.npmjs.com/package/@shanzhai/render-pug-plugin)                                                     | A Shanzhai plugin which renders parsed Pug, storing the results in the HTML source store.                                                                | ✔️       
[@shanzhai/render-pug-step](@shanzhai/render-pug-step)                                                         | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/render-pug-step.svg)](https://www.npmjs.com/package/@shanzhai/render-pug-step)                                                         | A Shanzhai step which renders parsed Pug files.                                                                                                          | ✔️       
[@shanzhai/serial-step](@shanzhai/serial-step)                                                                 | [![0.0.6](https://img.shields.io/npm/v/@shanzhai/serial-step.svg)](https://www.npmjs.com/package/@shanzhai/serial-step)                                                                 | A Shanzhai build step which runs any number of child build steps in serial.                                                                              | ✔️       
[@shanzhai/stringify-json-input](@shanzhai/stringify-json-input)                                               | [![0.0.2](https://img.shields.io/npm/v/@shanzhai/stringify-json-input.svg)](https://www.npmjs.com/package/@shanzhai/stringify-json-input)                                               | A Shanzhai input which "stringifies" a value after retrieving it from an input.                                                                          | ✔️       
[@shanzhai/stringify-json-output](@shanzhai/stringify-json-output)                                             | [![0.0.2](https://img.shields.io/npm/v/@shanzhai/stringify-json-output.svg)](https://www.npmjs.com/package/@shanzhai/stringify-json-output)                                             | A Shanzhai output which "stringifies" a value before passing it to an output.                                                                            | ✔️       
[@shanzhai/stringify-json-step](@shanzhai/stringify-json-step)                                                 | [![0.0.6](https://img.shields.io/npm/v/@shanzhai/stringify-json-step.svg)](https://www.npmjs.com/package/@shanzhai/stringify-json-step)                                                 | A Shanzhai step which "stringifies" a JSON value to a string.                                                                                            | ✔️       
[@shanzhai/svg-def-store](@shanzhai/svg-def-store)                                                             | [![0.0.1](https://img.shields.io/npm/v/@shanzhai/svg-def-store.svg)](https://www.npmjs.com/package/@shanzhai/svg-def-store)                                                             | A Shanzhai store for SVG defs.                                                                                                                           | ✔️       
[@shanzhai/svg-source-store](@shanzhai/svg-source-store)                                                       | [![0.0.1](https://img.shields.io/npm/v/@shanzhai/svg-source-store.svg)](https://www.npmjs.com/package/@shanzhai/svg-source-store)                                                       | A Shanzhai store for SVG source files.                                                                                                                   | ✔️       
[@shanzhai/type-script-compiler-options-store](@shanzhai/type-script-compiler-options-store)                   | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/type-script-compiler-options-store.svg)](https://www.npmjs.com/package/@shanzhai/type-script-compiler-options-store)                   | A Shanzhai store for TypeScript compiler options.                                                                                                        | ✔️       
[@shanzhai/type-script-global-store](@shanzhai/type-script-global-store)                                       | [![0.0.8](https://img.shields.io/npm/v/@shanzhai/type-script-global-store.svg)](https://www.npmjs.com/package/@shanzhai/type-script-global-store)                                       | A Shanzhai store for global variables to be included in TypeScript builds.                                                                               | ✔️       
[@shanzhai/type-script-source-store](@shanzhai/type-script-source-store)                                       | [![0.0.6](https://img.shields.io/npm/v/@shanzhai/type-script-source-store.svg)](https://www.npmjs.com/package/@shanzhai/type-script-source-store)                                       | A Shanzhai store for TypeScript source files.                                                                                                            | ✔️       
[@shanzhai/unkeyed-store-get-input](@shanzhai/unkeyed-store-get-input)                                         | [![0.0.0](https://img.shields.io/npm/v/@shanzhai/unkeyed-store-get-input.svg)](https://www.npmjs.com/package/@shanzhai/unkeyed-store-get-input)                                         | A Shanzhai input which reads the value of an unkeyed store.                                                                                              | ✔️       
[@shanzhai/unkeyed-store-set-output](@shanzhai/unkeyed-store-set-output)                                       | [![0.0.0](https://img.shields.io/npm/v/@shanzhai/unkeyed-store-set-output.svg)](https://www.npmjs.com/package/@shanzhai/unkeyed-store-set-output)                                       | A Shanzhai output which sets the value of an unkeyed store.                                                                                              | ✔️       
[@shanzhai/validate-json-schema-step](@shanzhai/validate-json-schema-step)                                     | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/validate-json-schema-step.svg)](https://www.npmjs.com/package/@shanzhai/validate-json-schema-step)                                     | A Shanzhai step which validates a JSON value against a JSON schema.                                                                                      | ✔️       
[@shanzhai/watch-cli](@shanzhai/watch-cli)                                                                     | [![0.0.6](https://img.shields.io/npm/v/@shanzhai/watch-cli.svg)](https://www.npmjs.com/package/@shanzhai/watch-cli)                                                                     | A CLI tool which performs a build of the Shanzhai project in the current directory, watching for changes and rebuilding automatically.                   | ❌        
[@shanzhai/wrap-in-object-output](@shanzhai/wrap-in-object-output)                                             | [![0.0.1](https://img.shields.io/npm/v/@shanzhai/wrap-in-object-output.svg)](https://www.npmjs.com/package/@shanzhai/wrap-in-object-output)                                             | A Shanzhai output which wraps a value in an object with a given key.                                                                                     | ✔️       
[@shanzhai/write-file-step](@shanzhai/write-file-step)                                                         | [![0.0.5](https://img.shields.io/npm/v/@shanzhai/write-file-step.svg)](https://www.npmjs.com/package/@shanzhai/write-file-step)                                                         | A Shanzhai step which writes to a binary or UTF-8 encoded text file, creating it if it does not exist, or replacing it if it does.                       | ✔️       
[@shanzhai/zip-content-store](@shanzhai/zip-content-store)                                                     | [![0.0.1](https://img.shields.io/npm/v/@shanzhai/zip-content-store.svg)](https://www.npmjs.com/package/@shanzhai/zip-content-store)                                                     | A Shanzhai store for SVG defs.                                                                                                                           | ✔️       
[@shanzhai/zip-plugin](@shanzhai/zip-plugin)                                                                   | [![0.0.2](https://img.shields.io/npm/v/@shanzhai/zip-plugin.svg)](https://www.npmjs.com/package/@shanzhai/zip-plugin)                                                                   | A Shanzhai plugin which zips the generated content.                                                                                                      | ✔️       
[@shanzhai/zip-step](@shanzhai/zip-step)                                                                       | [![0.0.6](https://img.shields.io/npm/v/@shanzhai/zip-step.svg)](https://www.npmjs.com/package/@shanzhai/zip-step)                                                                       | A Shanzhai step which creates a zip file from a list of binary or UTF-8 encoded text files.                                                              | ✔️       
[@shanzhai/zip-store](@shanzhai/zip-store)                                                                     | [![0.0.1](https://img.shields.io/npm/v/@shanzhai/zip-store.svg)](https://www.npmjs.com/package/@shanzhai/zip-store)                                                                     | A Shanzhai store for the distributable zip.                                                                                                              | ✔️       
[shanzhai](shanzhai)                                                                                           | [![0.0.10](https://img.shields.io/npm/v/shanzhai.svg)](https://www.npmjs.com/package/shanzhai)                                                                                          | This is a stub package.  You probably want a @shanzhai/* package instead.                                                                                | ✔️       

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fshanzhai?ref=badge_large)
