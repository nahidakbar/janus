/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;

ga('create', 'UA-97457188-1', 'auto');

export function pageview(page)
{
  try
  {
    ga('set', 'page', page);
    ga('send', 'pageview');
  }
  catch(e)
  {
    
  }
};

export function event(category, action, extra='')
{
  try
  {
    console.log(category, action, extra);
    ga('send', 'event', category, action, extra);
  }
  catch(e)
  {
    
  }
};
