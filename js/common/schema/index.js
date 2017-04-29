/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

import { booleanEditor, booleanViewer } from "./boolean";
import { numberEditor, numberViewer } from "./number";
import { stringViewer, stringEditor } from "./string";
import { arrayEditor, arrayViewer } from "./array";
import { objectEditor, objectViewer } from "./object";

export const editors = {
  boolean: booleanEditor,
  number: numberEditor,
  string: stringEditor,
  array: arrayEditor,
  object: objectEditor
};

export const viewers = {
  boolean: booleanViewer,
  number: numberViewer,
  string: stringViewer,
  array: arrayViewer,
  object: objectViewer
};

export function editor(schema)
{
  return (container, options, content, save) =>
    editors[schema.type](editors, container, schema, content, save, options);
}

export function viewer(schema)
{
  return (container, options, content) =>
    viewers[schema.type](viewers, container, schema, content, options);
}
