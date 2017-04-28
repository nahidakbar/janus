/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

import { Storage } from './Storage';

const IndexedDB = self.indexedDB || self.webkitIndexedDB || self.mozIndexedDB || self.msIndexedDB;

export class IndexedDBStorage extends Storage
{
  constructor(state)
  {
    super(state);
    this.db = new Promise((resolve, reject) =>
    {
      const request = IndexedDB.open(state.name, 1);
      request.onupgradeneeded = function(event) {
        request.result.createObjectStore("data");
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = e => reject(e);
    });
  }

  _store()
  {
    return new Promise((resolve, reject) =>
    {
      this.db.then(db =>
      {
        try
        {
          resolve(db.transaction("data", "readwrite").objectStore("data"));
        }
        catch(e)
        {
          reject(e);
        }
      }, reject);
    });
  }

  listFiles()
  {
    return new Promise((resolve, reject) =>
    {
      this._store().then(store =>
      {
        const request = store.getAllKeys();
        request.onsuccess = event =>
        {
          let output = {};
          for (let key of request.result)
          {
            if (this.isKey(key))
            {
              output[key] = this.getKeyItem(key);
            }
          }
          resolve(output);
        };
        request.onerror = reject;
      }, reject);
    });
  }
  
  getFile(key)
  {
    return new Promise((resolve, reject) =>
    {
      this._store().then(store =>
      {
        const request = store.get(key);
        request.onsuccess = event =>
        {
          resolve(request.result);
        };
        request.onerror = reject;
      }, reject);
    });
  }
  
  setFile(key, contents)
  {
    return new Promise((resolve, reject) =>
    {
      this._store().then(store =>
      {
        const request = store.put(contents, key);
        request.onsuccess = event =>
        {
          resolve(request.result);
        };
        request.onerror = reject;
      }, reject);
    });
  }
  
  deleteFile(key)
  {
    return new Promise((resolve, reject) =>
    {
      this._store().then(store =>
      {
        const request = store.delete(key);
        request.onsuccess = event =>
        {
          resolve(request.result);
        };
        request.onerror = reject;
      }, reject);
    });
  }
}
