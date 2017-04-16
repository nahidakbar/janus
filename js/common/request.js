"use strict";

const d3 = require("d3-request");

module.exports.request = function(method, url, body=null, transform=x=>x)
{
  let start = Date.now();
  return new Promise((resolve, reject) =>
  {
    d3.request(url)
    .header("Content-Type", "application/json")
    .send(method, JSON.stringify(body), function(err, xhr)
    {
      console.log(method, url, 'took', Date.now() - start, 'ms');
      if (err)
      {
        xhr = err.srcElement;
        reject(xhr && (xhr.response || xhr.responseText) || err);
      }
      else
      {
        resolve(transform(JSON.parse(xhr.responseText)));
      }
    });
  });
};

module.exports.create = module.exports.request.bind(module.exports, 'post');
module.exports.read = module.exports.request.bind(module.exports, 'get');
module.exports.update = module.exports.request.bind(module.exports, 'put');
module.exports.delete = module.exports.request.bind(module.exports, 'delete');
