/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

/**
 * Parent class of all storage elements.
 */
export class Storage
{
  constructor(state)
  {
    this.state = state; 
  }
  
  makeKey(name, type)
  {
    return `${name}.${type}`;
  }
  
  isKey(name)
  {
    return name.match(/^([A-Za-z0-9\-_]+)\.(md)$/)
  }
  
  getKeyItem(name)
  {
    let match = name.match(/^([A-Za-z0-9\-_]+)\.(\w+)$/);
    return {
      key: name,
      type: 'file',
      name: match[1],
      module: match[2],
    };
  }
}
