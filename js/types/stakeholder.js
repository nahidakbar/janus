/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

import * as schema from "common/schema"

const name = "Stakeholder";

const schemaDefinition = {
  type: 'object',
  properties: {
    Photo: {
      type: 'string',
      format: 'image'
    },
    Background: {
      type: 'string',
    },
    PerceivedSuccess: {
      type: 'array',
      format: 'onePerLineString',
      items: {
        type: 'string'
      }
    },
    Power: {
      type: 'number',
      format: 'range'
    },
    Interest: {
      type: 'number',
      format: 'range'
    }
  }
};

function view(container, item, content)
{
  const board = container.Table().Class('Stakeholder').Tbody().Tr();
  
  if (content.Photo)
  {
    board.Td().Img().Src(content.Photo);
  }
  
  if (content.Background)
  {
    board.Td().P(content.Background);
  }
  
  if (content.PerceivedSuccess)
  {
    board.Td().Ul().Children(content.PerceivedSuccess, 'li', x => x.text(i => i));
  }
  
  const outcome = board.Td()//.Border('2px solid black');
  
  if (content.Power > 0 && content.Interest > 0)
  {
    outcome.Strong('Promoter / Key Player');
    outcome.UlList('Manage closely',
                   'Engage regularly',
                   'Consult regularly');
  }
  else if (content.Power > 0 && content.Interest < 0)
  {
    outcome.Strong('Latent');
    outcome.UlList('Engage and consult in interest areas',
                   'Aim to increase their level of interest');
  }
  else if (content.Power < 0 && content.Interest > 0)
  {
    outcome.Strong('Defender / Ambassador');
    outcome.UlList('Keep informed',
                   'Consult in interest area',
                   'Keep involved in low risk areas');
  }
  else
  {
    outcome.Strong('Uninterested');
    outcome.UlList('Inform via general communication (e.g. newsletters, websites)',
                   'Aim to increase their level of interest');
  }
}

const edit = schema.editor(schemaDefinition);

const templates = {
  Blank: {},
};

export const stakeholder = {
  name,
  view,
  edit,
  templates
};
