class Storage
{
  constructor(state)
  {
    this.state = state; 
  }
  
  makeKey(name, type)
  {
    return `${name}.${type}.janus`;
  }
  
  isKey(name)
  {
    return name.match(/^(\w+)\.(\w+)\.janus$/)
  }
  
  getKeyItem(name)
  {
    let match = name.match(/^(\w+)\.(\w+)\.janus$/);
    return {
      key: name,
      type: 'file',
      name: match[1],
      module: match[2],
    };
  }
  
}

module.exports = Storage;
