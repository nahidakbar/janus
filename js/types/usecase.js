/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

import * as schema from "common/schema"

const name = "Use Case";

const schemaDefinition = {
  type: "object",
  properties: {
    Description: {
      type: "string",
    },
    ApplicablleTo: {
      type: "array",
      format: "fileLinksString",
      linkageType: "user",
      items: {
        type: "string"
      }
    }
  }
};

const view = schema.viewer(schemaDefinition);
const edit = schema.editor(schemaDefinition);

const templates = {
  Blank: {},
};

export const usecase = {
  name,
  view,
  edit,
  templates
};
