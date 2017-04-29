/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

import {default as pluralise} from "pluralize";

export function arrayEditor(editors, container, schema, content, save, options)
{
  if (!schema.format || !arrayEditors[schema.format])
  {
    console.error('Array editor of type', schema.format, 'not found');
    schema.format = 'default';
  }
  try
  {
    arrayEditors[schema.format](editors, container, schema, content, save, options);
  }
  catch(e)
  {
    console.error(e);
  }
}

export function arrayViewer(viewers, container, schema, content, options)
{
  try
  {
    content.forEach(row =>
    {
      viewers[schema.items.type](viewers, container.Div(), schema.items, row, options);
    });
  }
  catch(e)
  {
    console.error(e);
  }
}

function arrayEditorDefault(editors, container, schema, content, save, options)
{
  console.error('TODO');
}

function arrayEditorOnePerLineString(editors, container, schema, content, save, options)
{
  const control = container.Textarea()
    .text((content || []).join('\n'))
    .Placeholder('one item per line');
  control.OnChange(() =>
  {
    const value = control.Value().split('\n').filter(x => x);
    if (value.length > 0)
    {
      save(value);
    }
    else
    {
      save(undefined);
    }
  });
  control.OnInput(control.OnChange());
}

function arrayEditorFileLinks(editors, container, schema, content, save, options)
{
  let links = Object.keys(options.items).filter(item => item.indexOf("." + schema.linkageType) !== -1).map(item => item.substr(0, item.indexOf(".")));
  const linked = {};
  (content || []).filter(link => links.indexOf(link) !== -1).forEach(link => linked[link] = true);
  if (links.length === 0)
  {
    container.P(`No ${pluralise(schema.linkageType)} Found`);
  }
  else
  {
    container = container.Table().Tbody();
    links.forEach(link =>
    {
      const row = container.Tr();
      row.Td(link.toUncamelCase());
      const control = row.Td().Checkbox().Checked(linked[link]);
      control.OnChange(() =>
      {
        linked[link] = control.Checked();
        let output = {};
        for (let prop in linked)
        {
          if (linked[prop])
          {
            output[prop] = true;
          }
        }
        output = Object.keys(output);
        if (output.length === 0)
        {
          output = undefined
        }
        save(output);
      });
    });
  }
}

export const arrayEditors = {
  default: arrayEditorDefault,
  onePerLineString: arrayEditorOnePerLineString,
  fileLinksString: arrayEditorFileLinks
};
