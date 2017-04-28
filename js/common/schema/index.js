/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

import { boolean } from "./boolean";
import { number } from "./number";
import { string } from "./string";
import { array } from "./array";
import { object } from "./object";

export const typeEditors = {
  boolean,
  number,
  string,
  array,
  object
};

export function edit(container, schema, content, save)
{
  typeEditors[schema.type](schema, container, content, save);
}
