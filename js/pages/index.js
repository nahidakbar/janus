/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

const projects = require('projects');

export default function(context)
{
  const parent = context.body.clear();
  showProjects(parent, context);
  showStorage(parent, context);
};

function showProjects(parent, context)
{
  parent.H2(`Current Projects`);
  
  projects.list().forEach(project =>
  {
    parent.Button(project.name).OnClick(() =>
    {
      window.location.hash = context.Link({
        page: 'project',
        name: project.name
      });
    }).Display('block');
  });
  if (projects.list().length === 0)
  {
    parent.P(`No projects`);
  }
}

function showStorage(parent, context)
{
  const storageModules = [
    {
      page: 'localstorage',
      label: 'Local Storage (offline)'
    },
    {
      page: 'indexeddb',
      label: 'IndexedDB (offline)'
    }
  ];

  parent.H2(`Start A New Project`);
  
  const buttons = parent.P();
  storageModules.forEach(module =>
  {
    buttons.Button(`In ${module.label}`).OnClick(() =>
    {
      window.location = context.Link({
        page: module.page, 
      });
    }).Class('big').Display('block');
  });

}
