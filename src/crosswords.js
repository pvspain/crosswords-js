// ViteJS will bundle the converted CSS as ../dist/crosswords.css
import "../style/crosswords.less";

import {
  CrosswordController as Controller,
  newCrosswordController,
} from "./crossword-controller.mjs";
import {
  newCrosswordModel as compileCrossword,
  convertSourceFileToDefinition,
  newCrosswordDefinition,
  newCrosswordSource,
} from "./crossword-model.mjs";
import {
  assert,
  ecs,
  eid,
  isArray,
  isNumber,
  isObject,
  isString,
  isTruthy,
  trace,
  tracing,
} from "./helpers.mjs";

const helpers = {
  assert, // Validate function arguments and entry conditions
  ecs, // DOM helper, wrapper for document.getElementByClass()
  eid, // DOM helper, wrapper for document.getElementById()
  isArray,
  isNumber,
  isObject,
  isString,
  isTruthy,
  trace, // Log information, warnings and errors to the console
  tracing, // Console logging toggle - pass boolean 'true' to emit messages to the console.
};

export {
  Controller, // Create a CrosswordDefinition from a filesystem path to a crossword source file (.json, .yml).
  // NOTE: This function accesses the local file system, and is therefore typically limited to server-side code.
  compileCrossword, // Create a new CrosswordDefinition input and validate its structure.
  convertSourceFileToDefinition, //Legacy export. Use newCrosswordController() for all new projects.
  helpers, // Used by puzzle setters to verify the conformance of a crosswordDefinition
  newCrosswordController, // Create a new minimal CrosswordSource string in JSON format.
  newCrosswordDefinition,
  newCrosswordSource,
};
