/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

const projects = require("projects");

export default function(context)
{
  projects.add({
    type: "localstorage",
    name: "LocalStorage"
  });
  window.location.hash = "#";
};
