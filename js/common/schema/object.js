/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

export function objectEditor(editors, container, schema, content, save)
{
  content = Object.assign({}, content || {});
  const parent = container.clear().Table().Tbody();
  Object.keys(schema.properties)
    .forEach(propertyName =>
    {
      const propertyParent = parent.Tr();
      const propertyLabel = propertyParent.Th(propertyName.toUncamelCase() + ':');
      const propertyContainer = propertyParent.Td();
      const propertySchema = schema.properties[propertyName];
      
      function render()
      {
        
        editors[propertySchema.type](editors, propertyContainer.clear(), propertySchema, content[propertyName], propertyValue =>
        {
          content[propertyName] = propertyValue;
          let output = {};
          for (let prop in content)
          {
            if (content[prop])
            {
              output[prop] = content[prop];
            }
          }
          if (Object.keys(output).length === 0)
          {
            output = undefined
          }
          save(output);
        });
      }
      
      if (!content[propertyName] && propertySchema.type !== 'boolean')
      {
        propertyContainer.Button('Edit').OnClick(render);
      }
      else
      {
        render();
      }
      
    });
  
}

export function objectViewer(viewers, container, schema, content)
{
  const parent = container.Table().Tbody();
  content = Object.assign({}, content || {});
  Object.keys(schema.properties)
    .forEach(propertyName =>
    {
      if (content[propertyName])
      {
        const propertyParent = parent.Tr();
        const propertyLabel = propertyParent.Th(propertyName.toUncamelCase() + ':');
        const propertyContainer = propertyParent.Td();
        const propertySchema = schema.properties[propertyName];        
        viewers[propertySchema.type](viewers, propertyContainer, propertySchema, content[propertyName]);
      }
    });
}
