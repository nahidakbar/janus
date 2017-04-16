"use strict";

let projects = JSON.parse(localStorage.janus || '{}');

let types = {
  'localstorage': require('./LocalStorage'),
};

module.exports.add = spec =>
{
  projects[spec.name] = spec;
  localStorage.janus = JSON.stringify(projects);
};

module.exports.get = name =>
{
  let project = projects[name];
  let class_ = types[project.type];
  return new class_(project);
};

module.exports.list = () => Object.keys(projects).map(name => projects[name]);
