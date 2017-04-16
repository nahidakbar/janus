const projects = require('projects');
const modules = require('modules');
const pluralise = require('pluralize');

module.exports = function(context)
{
  context.head.text(context.State('name'));
  showFolder(context, projects.get(context.State('name')), context.State('folder'));
};

function showFolder(context, project, folder)
{
  project.listFolder(folder).then(list =>
  {
    let parent = context.body.clear();
    if (folder)
    {
      parent.H2(folder);
    }
    
    let sections = {};
    
    list.forEach(item =>
    {
      if (!sections[item.module])
      {
        parent.P(pluralise(modules[item.module].name)).Class('noprint');
        sections[item.module] = parent.Div();
      }
      let section = sections[item.module];
      showFile(context, section.Div(), project, folder, item);
    });
    
    let newSection = parent.Div().Class('noprint');
    
    newSection.H2('Create New File');
    let nameInput = newSection.Text().Pattern('^[A-Za-z0-9]+$').Placeholder('File Name');
    let typeInput = newSection.Select().Options(getOptions()).Placeholder('File Type');
    newSection.Button('Create').OnClick(() =>
    {
      let name = nameInput.Value();
      let type = typeInput.Value();
      if (name && nameInput.Validity().valid)
      {
        project.setFile(folder, project.makeKey(name, type), modules[type].defaultValue)
          .then(() => showFolder(context, project, folder));
      }
    });

  });
}

function showFile(context, section, project, folder, item)
{
  section.H1(item.name);
  let itemContainer = section.Div().Class('item');
  let itemContent = itemContainer.Div().Class('content');
  let itemToolbar = itemContainer.Div().Class('toolbar');
  let module = modules[item.module];
  itemContent.Loader();
  project.getFile(folder, item.key).then(contents =>
  {
    module.view(itemContent.clear(), item, contents);
    itemToolbar.Button('Edit').OnClick(() =>
    {
      let editContainer = itemContent.clear().Div();
      let changed = item;
      modules[item.module].edit(editContainer, item, contents, update =>
      {
        changed = update;
      });  
      let editToolbar = itemContent.Div();
      editToolbar.Button('Save').OnClick(() =>
      {
        project.setFile(folder, item.key, changed).then(() =>
        {
          alert('Saved');
          contents = changed;
        });
      });
      editToolbar.Button('Done').OnClick(() =>
      {
        if (JSON.stringify(contents) !== JSON.stringify(changed) && confirm("Save changes?"))
        {
          project.setFile(folder, item.key, changed).then(() =>
          {
            contents = changed;
            module.view(itemContent.clear(), item, contents);
          });
        }
        else
        {
          module.view(itemContent.clear(), item, contents);
        }
      });
    });
    itemToolbar.Button('Delete').OnClick(() =>
    {
      if (confirm(`Are you sure you want to delete ${item.name}?`))
      {
        project.delFile(folder, item.key)
          .then(() => showFolder(context, project, folder));
      }
    });
  });
}

function getOptions()
{
  let output = {};
  Object.keys(modules).forEach(type => output[type] = modules[type].name);
  return output;
}
