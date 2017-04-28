/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

export function booleanEditor(editors, container, schema, content, save)
{
  const editor = container.Checkbox();
  editor.Checked(content);
  editor.OnChange(() =>
  {
    save(editor.Checked() || undefined);
  });
}

export function booleanViewer(viewers, container, schema, content)
{
  
}
