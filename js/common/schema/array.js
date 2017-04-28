/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

export function arrayEditor(editors, container, schema, content, save)
{
  if (!schema.format || !arrayEditors[schema.format])
  {
    schema.format = 'default';
  }
  arrayEditors[schema.format](editors, container, schema, content, save);
}

export function arrayViewer(viewers, container, schema, content)
{
  content.forEach(row =>
  {
    viewers[schema.items.type](viewers, container.Div(), schema.items, row);
  });
}

function arrayEditorDefault(editors, container, schema, content, save)
{
  console.error('TODO');
}

function arrayEditorOnePerLineString(editors, container, schema, content, save)
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

export const arrayEditors = {
  default: arrayEditorDefault,
  onePerLineString: arrayEditorOnePerLineString
};
