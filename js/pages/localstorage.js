/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

const projects = require('projects');

export default function(context)
{
  const parent = context.body.clear();
  projects.add({
    type: 'localstorage',
    name: 'LocalStorage'
  });
  window.location.hash = '#';
};
