/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

import { Storage } from './Storage';

export class LocalStorage extends Storage
{
  /**
   * @param {String} folder Folder to list dir of.
   * @return {Promise} Will resolve with map[filekey]FileDetails
   */
  listFolder(folder)
  {
    return new Promise(resolve =>
    {
      let output = {};
      for (let key in localStorage)
      {
        if (this.isKey(key))
        {
          output[key] = this.getKeyItem(key);
        }
      }
      resolve(output);
    });
  }
  
  /**
   * @param {String} folder Folder where file exists.
   * @param {String} key Name of file to read.
   * @return {Promise} Will resolve with content of file (string).
   */
  getFile(folder, key)
  {
    return new Promise(resolve => resolve(localStorage[key]));
  }
  
  /**
   * @param {String} folder Folder where file should be.
   * @param {String} key Name of file to write.
   * @param {String} contents Contents of file.
   * @return {Promise} Will resolve when file is saved.
   */
  setFile(folder, key, contents)
  {
    localStorage[key] = contents;
    return new Promise(resolve => resolve());
  }
  
  /**
   * @param {String} folder Folder where file exists.
   * @param {String} key Name of file to delete.
   * @return {Promise} Will resolve when file is deleted.
   */
  deleteFile(folder, key)
  {
    delete localStorage[key];
    return new Promise(resolve => resolve());
  }
  
  /**
   * @param {String} folder Folder where file exists.
   * @param {String} oldKey Name of file to rename.
   * @param {String} newKey New name of file.
   * @return {Promise} Will resolve when file is renamed.
   */
  renameFile(folder, oldKey, newKey)
  {
    return new Promise((resolve, reject) =>
    {
      if (localStorage[newKey])
      {
        reject(`New file already exists.`);
      }
      else
      {
        localStorage[newKey] = localStorage[oldKey];
        delete localStorage[oldKey];
        resolve();
      }
    });
  }
}
