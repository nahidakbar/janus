/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

const marked = require("marked");

const name = "Note";

function view(container, item, content)
{

  let sanitize = true;
    
  content = marked(content, {sanitize});
  
  let progress = content.match(/\[[x ]\]/g);
  
  //content = content.replace(/\[ ]/g, "<input type="checkbox" onclick="return false;" />");
  //content = content.replace(/\[x\]/g, "<input type="checkbox" checked onclick="return false;" />");
  
  container.html(content);
  
  if (progress)
  {
    let width = Math.floor(progress.filter(x => x === "[x]").length / progress.length * 100) + "%";
    if (width !== "0%")
    {
      container.Div().Class("progress").Div("Progress " + width).Width(width).Class("bar");
    }
  }
}

function edit(container, item, content, save)
{
  let editor = container.Textarea(content).Display("inline-block").BoxSizing("border-box").VerticalAlign("top").Width("50%").MinHeight("200px").Resize("vertical");
  let preview = container.Div().Display("inline-block").BoxSizing("border-box").VerticalAlign("top").Width("50%").Padding("0.5em 0.5em 0.5em 0.5em");
  editor.OnInput(() =>
  {
    this.view(preview, item, editor.Value());
    save(editor.Value());
  });
  editor.OnChange(() =>
  {
    save(editor.Value());
  });
  editor.OnInput()();
}

const templates = {
  Blank: "",
  Checklist: `

- [x] Task #1
- [ ] Task #2
- [ ] Task #3

`,
};

export const md = {
  name,
  view,
  edit,
  templates
};
