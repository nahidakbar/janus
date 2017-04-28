/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

const d3 = require("d3-request");

/**
 * Make a http request.
 * @return {Promise}
 */
export function request(method, url, body=null, transform=x=>x)
{
  let start = Date.now();
  return new Promise((resolve, reject) =>
  {
    d3.request(url)
    .header("Content-Type", "application/json")
    .send(method, JSON.stringify(body), function(err, xhr)
    {
      console.log(method, url, "took", Date.now() - start, "ms");
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
}

export function Create()
{
  return request.apply(null, ["post"].concat(arguments));
}

export function Read()
{
  return request.apply(null, ["get"].concat(arguments));
}

export function Update()
{
  return request.apply(null, ["put"].concat(arguments));
}

export function Delete()
{
  return request.apply(null, ["delete"].concat(arguments));
}
