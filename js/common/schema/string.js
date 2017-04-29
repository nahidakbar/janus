/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

export function stringEditor(editors, container, schema, content, save, options)
{
  if (!schema.format || !stringEditors[schema.format])
  {
    schema.format = 'default';
  }
  stringEditors[schema.format](editors, container, schema, content, save, options);
}

function stringEditorDefault(editors, container, schema, content, save, options)
{
  const control = container.Textarea().text(content || '');
  control.OnChange(() =>
  {
    const value = control.Value();
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

function stringEditorImage(editors, container, schema, content, save, options)
{
  const current = container.Img().MaxWidth('90%').Src(content);
  const control = container.File();
  control.OnChange(() =>
  {
    const reader = new FileReader();
    reader.onload = function(e)
    {
      const value = reader.result;
      current.Src(value);
      if (value.length > 0)
      {
        save(value);
      }
      else
      {
        save(undefined);
      }
    }
    reader.readAsDataURL(control.property('files')[0]);
  });
  container.Button('Delete').OnClick(() =>
  {
    current.Src('');
    save(undefined);
  });
}

function stringEditorControl(editors, container, schema, content, save, options)
{
  const control = container.Input().Type(schema.type).Value(content || '');
  control.OnChange(() =>
  {
    const value = control.Value();
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

export const stringEditors = {
  default: stringEditorDefault,
  image: stringEditorImage,
  color: stringEditorControl,
  date: stringEditorControl,
  "datetime-local": stringEditorControl,
  email: stringEditorControl,
  month: stringEditorControl,
  number: stringEditorControl,
  range: stringEditorControl,
  search: stringEditorControl,
  tel: stringEditorControl,
  time: stringEditorControl,
  url: stringEditorControl,
  week: stringEditorControl,
};

export function stringViewer(viewers, container, schema, content, options)
{
  if (!schema.format || !stringViewers[schema.format])
  {
    schema.format = 'default';
  }
  stringViewers[schema.format](viewers, container, schema, content, options);
}

export function stringViewerDefault(viewers, container, schema, content, options)
{
  container.P(content)
}

export function stringViewerImage(viewers, container, schema, content, options)
{
  container.Img().Src(content);
}

export const stringViewers = {
  default: stringViewerDefault,
  image: stringViewerImage,
};
