const projects = require('projects');

module.exports = function(context)
{
  const parent = context.body.clear();
  projects.add({
    type: 'localstorage',
    name: 'LocalStorage'
  });
  window.location.hash = '#';
};
