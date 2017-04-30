/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

export function numberEditor(editors, container, schema, content, save, options)
{
  const control = container.Number().Value(content || 0);
  if (schema.format)
  {
    control.attr('type', schema.format);
  }
  if (schema.format === 'range')
  {
    control.attr('min', -1);
    control.attr('max', 1);
    control.attr('step', 0.1);
  }
  control.OnChange(() =>
  {
    const value = control.Value();
    if (value.length > 0)
    {
      save(parseFloat(value));
    }
    else
    {
      save(undefined);
    }
  });
  control.OnInput(control.OnChange());
}

export function numberViewer(viewers, container, schema, content, options)
{
  container.P(content);
}
