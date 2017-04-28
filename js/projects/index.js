/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

let projects = JSON.parse(localStorage.janus || "{}");

import { LocalStorage } from "./LocalStorage";
import { IndexedDBStorage } from "./IndexedDB";

let types = {
  "localstorage": LocalStorage,
  "indexeddb": IndexedDBStorage,
};

export function add(spec)
{
  projects[spec.name] = spec;
  localStorage.janus = JSON.stringify(projects);
}

export function get(name)
{
  let project = projects[name];
  let class_ = types[project.type];
  return new class_(project);
}

export function list()
{
  return Object.keys(projects).map(name => projects[name]);
}
