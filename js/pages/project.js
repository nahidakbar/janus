/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

const projects = require("projects");
const types = require("types");
const naturalSort = require("javascript-natural-sort");

import * as analytics from "common/analytics";

export default function(context)
{
  context.head.text(context.State("name").toUncamelCase());
  showFiles(context, projects.get(context.State("name")));
}

function showFiles(context, project)
{
  project.listFiles().then(list =>
  {
    let parent = context.body.clear();
    Object.keys(list)
      .sort(naturalSort)
      .forEach(key =>
      {
        let item = list[key];
        showFile(context, parent.Div(), project, item);
      });
    newFile(context, parent.Div().Class("noprint"), project);
  });
}

function newFile(context, parent, project)
{
  parent.H2("Create New File");
  parent.Label("Name: ").Display("block");
  let nameInput = parent.Text().Pattern("^[A-Za-z0-9\-_]+$").Display("block");
  parent.Label("Type: ").Display("block");
  let typeInput = parent.Select().Options(getTypes()).Display("block");
  parent.Label("Template: ").Display("block");
  let templateInput = parent.Select().Options(getTypeDefaults(typeInput.Value())).Display("block");
  typeInput.OnChange(() =>
  {
    analytics.event(typeInput.Value(), "select");
    templateInput.Options(getTypeDefaults(typeInput.Value()));
  });
  templateInput.OnChange(() =>
  {
    analytics.event(typeInput.Value(), "select", templateInput.Value());
  });
  parent.Button("Create").OnClick(() =>
  {
    let name = nameInput.Value();
    let type = typeInput.Value();
    let template = templateInput.Value();
    analytics.event(type, "create", template);
    if (name && nameInput.Validity().valid)
    {
      project.setFile(project.makeKey(name, type), types[type].templates[template])
        .then(() =>
        {
          analytics.event(type, "create-success", template);
          showFiles(context, project);
        });
    }
  }).Display("block");
}

function showFile(context, section, project, item)
{
  section.H1(item.name.toUncamelCase());
  let itemContainer = section.Div().Class("item");
  let itemContent = itemContainer.Div().Class("content");
  let itemToolbar = itemContainer.Div().Class("toolbar");
  let module = types[item.type];
  itemContent.Loader();
  project.getFile(item.key).then(contents =>
  {
    module.view(itemContent.clear(), item, contents);
    itemToolbar.Button("Rename").OnClick(() =>
    {
      analytics.event(item.type, "rename", "attempt");
      let newName = prompt(`Please enter a new name for ${item.name}`, item.name);
      if (newName)
      {
        newName = newName.replace(/[^A-Z0-9a-z\-_]/g, "");
        if (newName && newName !== item.name)
        {
          let newKey = project.makeKey(newName, item.type);
          project.renameFile(item.key, newKey)
            .then(() =>
            {
              analytics.event(item.type, "rename", "success");
              item.key = newKey;
              showFiles(context, project);
            }, err =>
            {
              alert(err);
              analytics.event(item.type, "rename", "failure");
            });
        }
      }
    });
    itemToolbar.Button("Edit").OnClick(() =>
    {
      analytics.event(item.type, "edit");
      itemToolbar.Display("none");
      let editContainer = itemContent.clear().Div();
      let changed = contents;
      types[item.type].edit(editContainer, item, contents, update =>
      {
        changed = update;
      });  
      let editToolbar = itemContent.Div();
      editToolbar.Button("Save").OnClick(() =>
      {
        analytics.event(item.type, "save", "attempt");
        project.setFile(item.key, changed).then(() =>
        {
          alert("Saved");
          contents = changed;
          analytics.event(item.type, "save", "success");
        }, err =>
        {
          alert(err);
          analytics.event(item.type, "save", "failure");
        });
      });
      editToolbar.Button("Done").OnClick(() =>
      {
        itemToolbar.Display("");
        if (JSON.stringify(contents) !== JSON.stringify(changed) && confirm("Save changes?"))
        {
          analytics.event(item.type, "done", "attempt");
          project.setFile(item.key, changed).then(() =>
          {
            analytics.event(item.type, "done", "success");
            contents = changed;
            module.view(itemContent.clear(), item, contents);
          }, err =>
          {
            console.error(err);
            analytics.event(item.type, "done", "failure");
          });
        }
        else
        {
          analytics.event(item.type, "done", "nochange");
          module.view(itemContent.clear(), item, contents);
        }
      });
    });
    itemToolbar.Button("Delete").OnClick(() =>
    {
      analytics.event(item.type, "delete", "click");
      if (confirm(`Are you sure you want to delete ${item.name}?`))
      {
        analytics.event(item.type, "delete", "attempt");
        project.deleteFile(item.key)
          .then(() =>
          {
            analytics.event(item.type, "delete", "success");
            showFiles(context, project);
          }, err =>
          {
            analytics.event(item.type, "delete", "failure");
            alert(err);
          });
      }
      else
      {
        analytics.event(item.type, "delete", "cancel");
      }
    });
  });
}

function getTypes()
{
  let output = {};
  Object.keys(types).forEach(type => output[type] = types[type].name);
  return output;
}

function getTypeDefaults(type)
{
  let output = {};
  Object.keys(types[type].templates).forEach(template => output[template] = template.toUncamelCase());
  return output;
}
