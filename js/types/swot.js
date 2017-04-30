/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

import * as schema from "common/schema"

const name = "SWOT";

const schemaDefinition = {
  type: 'object',
  properties: {
    Strengths: {
      type: 'array',
      format: 'onePerLineString',
      items: {
        type: 'string'
      }
    },
    Weaknesses: {
      type: 'array',
      format: 'onePerLineString',
      items: {
        type: 'string'
      }
    },
    Opportunities: {
      type: 'array',
      format: 'onePerLineString',
      items: {
        type: 'string'
      }
    },
    Threats: {
      type: 'array',
      format: 'onePerLineString',
      items: {
        type: 'string'
      }
    }
  }
};

function view(container, item, content)
{
  const board = container.Table().Class('SWOT').Tbody();
  const upperHead = board.Tr();
  const upperBody = board.Tr();
  const lowerHead = board.Tr();
  const lowerBody = board.Tr();
  
  upperHead.Th('Strengths');
  upperBody.Td().Children(content.Strengths || [], 'li', point => point.text(text => text))
  
  upperHead.Th('Weaknesses');
  upperBody.Td().Children(content.Weaknesses || [], 'li', point => point.text(text => text))
  
  lowerHead.Th('Opportunities');
  lowerBody.Td().Children(content.Opportunities || [], 'li', point => point.text(text => text))
  
  lowerHead.Th('Threats');
  lowerBody.Td().Children(content.Threats || [], 'li', point => point.text(text => text))
  
}
const edit = schema.editor(schemaDefinition);

const templates = {
  Blank: {},
};

export const swot = {
  name,
  view,
  edit,
  templates
};
