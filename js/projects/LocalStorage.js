const Storage = require('./Storage');

const YAML = require('yamljs');

class LocalStorage extends Storage
{
  listFolder()
  {
    return new Promise(resolve =>
    {
      let output = [];
      for (let key in localStorage)
      {
        if (this.isKey(key))
        {
          output.push(this.getKeyItem(key));
        }
      }
      resolve(output);
    });
  }
  
  getFile(folder, key)
  {
    return new Promise(resolve => resolve(localStorage[key]));
  }
  
  setFile(folder, key, contents)
  {
    localStorage[key] = contents;
    return new Promise(resolve => resolve());
  }
  
  delFile(folder, key)
  {
    delete localStorage[key];
    return new Promise(resolve => resolve());
  }
}

module.exports = LocalStorage;
