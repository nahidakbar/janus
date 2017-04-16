const projects = require('projects');

module.exports = function(context)
{
  const parent = context.body.clear();
  
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
  
  parent.H2(`Start A New Project`);
  
  const buttons = parent.P();
  [/*
    {
      page: 'github',
      label: 'A Github Repo'
    },
    {
      page: 'dropbox',
      label: 'A Dropbox Folder'
    },*/
    {
      page: 'localstorage',
      label: 'Local Storage'
    }
  ].forEach(module =>
  {
    buttons.Button(`In ${module.label}`).OnClick(() =>
    {
      window.location = context.Link({
        page: module.page, 
      });
    }).Class('big').Display('block');
  });
  
  context.body.Div().Markdown(`
  
## About

Janus is intended to be a lightweight diagramming tool for software engineering
activities.

## Features

Storage so far:

* LocalStorage

Tools so far:

* Notes/Wiki

## Security

This tool is designed to run entirely in the client side (in your browser).
There is no server side components to store any private information.
It works directly with third party storage APIs (such as github and dropbox).

## Privacy

No user specific information is collectied. However, the following information
on tool usage is collected through google analytics:

* which pages/features are viewed,
* how long is spent on each page, and
* which functionality inside pages are used.`);
};
