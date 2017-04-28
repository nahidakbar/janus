/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

const projects = require('projects');

export default function(context)
{
  const parent = context.body.clear();
  
  parent.Div().Label('Please insert name of project (use camelcase):');
  
  const name = parent.Div().Text().Pattern("^[a-zA-Z0-9]+$");
  
  parent.Div().Button('Create').OnClick(() =>
  {
    if (name.Validity().valid)
    {
      projects.add({
        type: 'indexeddb',
        name: name.Value()
      });
      window.location.hash = '#';
    }
  });
};
