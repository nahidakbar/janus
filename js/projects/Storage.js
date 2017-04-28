/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

import * as types from "types";

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
    const match = name.match(/^([A-Za-z0-9\-_]+)\.(\w+)$/);
    return match && types[match[2]];
  }
  
  getKeyItem(name)
  {
    let match = name.match(/^([A-Za-z0-9\-_]+)\.(\w+)$/);
    return {
      key: name,
      type: match[2],
      name: match[1],
    };
  }
  
  renameFile(oldKey, newKey)
  {
    return new Promise((resolve, reject) =>
    {
      this.getFile(oldKey).then(contents =>
      {
        this.setFile(newKey, contents).then(() =>
        {
          this.deleteFile(oldKey).then(resolve, reject);
        }, reject);
      }, reject);
    });
  }
  
}
