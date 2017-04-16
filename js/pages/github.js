const request = require("common/request");
/*
function getAccessToken(context)
{
  const parent = context.contents.clear();
  
  parent.Markdown(`
  ## Setp 1: Set Up Github Access
  
  Janus will not store or manage any secrets and keys outside an your browser.
  
  You will be required generate a personal access token for janus and fill it in.
  
  To get started, create a new Personal Access Token from your github settings page.

  Be sure to select the following scopes:
  
  * "repo" for using both private and public repos or just "public_repo".
  
  Nothing else is necessary.
  
  Once done, fill in the following details: `);

  parent.Br();

  parent.Label('Access Token:');
  const token = parent.Text();
  
  parent.Br();
  
  parent.Button('Set').OnClick(() =>
  {
    localStorage.githubToken = token.Value();
    context.Reload();
  });
}

function getRepository(context)
{
  request.read(`https://api.github.com/user/repos?access_token=${localStorage.githubToken}`).then(repos =>
  {
    const parent = context.contents.clear();
    parent.H2('Please select a repository:');
    repos.forEach(repo =>
    {
      parent.Button(repo.full_name).OnClick(() =>
      {
        window.githubRepopsitory = repo;
        console.log(repo);
        context.Reload();
      }).Class('big').Display('block');
    });
  });
}

function getBranch(context)
{
  request.read(window.githubRepopsitory.branches_url.replace('{/branch}', `?access_token=${localStorage.githubToken}`)).then(branches =>
  {
    const parent = context.contents.clear();
    parent.H2('Please select a branch:');
    branches.forEach(branch =>
    {
      parent.Button(branch.name).OnClick(() =>
      {
        window.githubBranch = branch;
        console.log(branch);
        context.Reload();
      }).Class('big').Display('block');
    });
    if (branches.length === 1)
    {
      window.githubBranch = branches[0];
      console.log(branches[0]);
      context.Reload();
    }
  });
}

function getFolder(context, path='', parent=null)
{
  parent = parent || window.githubBranch.commit;
  request.read(window.githubRepopsitory.trees_url.replace('{/sha}', `/${parent.sha}?access_token=${localStorage.githubToken}`)).then(tree =>
  {
    console.log(tree);
    const parent = context.contents.clear();
    parent.H2(`Please select a folder: ${path}`);
    tree.tree.filter(xx => xx.type === "tree").forEach(tree =>
    {
      parent.Button(tree.path).OnClick(() =>
      {
        getFolder(context, (path? path + '/' : '') + tree.path, tree);
      }).Class('big').Display('block');
    });
    parent.Button('Select This Folder').OnClick(() =>
    {
      parent.path = path;
      window.githubFolder = parent;
      console.log(parent);
      context.Reload();
    }).Class('big').Display('block');
  });
}
*/

function getRepositories(endpoint, accessToken)
{
  return new Promise((resolve, reject) =>
  {
    request.read(`${endpoint}/user/repos?access_token=${accessToken}`).then(repos =>
    {
      resolve(repos.map(repo => repo.full_name));
    }, reject);
  });
}

function getBranches(endpoint, accessToken, repository)
{
  return new Promise((resolve, reject) =>
  {
    request.read(`${endpoint}/user/repos?access_token=${accessToken}`).then(repos =>
    {
      resolve(repos.map(repo => repo.full_name));
    }, reject);
  });
}

module.exports = function(context)
{
  const parent = context.contents.clear();
  
  const title = parent.H2('New Github Project');
  
  const form = parent.Div();
  
  form.Label('API Endpoint:').Display('block');
  const endpointInput = form.Text().Value('https://api.github.com').Display('block');
  
  form.Label('Personal Access Token:').Display('block');
  const accessTokenInput = form.Text().Display('block');
  
  const output = parent.Div();
  
  form.Button("Next").OnClick(() =>
  {
    let endpoint = endpointInput.Value();
    let accessToken = accessTokenInput.Value();
    getRepositories(endpoint, accessToken).then(repos =>
    {
      form.clear();
      form.Label('Repository:').Display('block')
      let repositoryInput = form.Select().Options(repos).Display('block');
      form.Button("Next").OnClick(() =>
      {
        let repository = repositoryInput.Value();
        getBranches(endpoint, accessToken, repository).then(repos =>
        {
          form.clear();
          form.Label('Branch:').Display('block')
          let branchInput = form.Select().Options(repos).Display('block');
          form.Button("Next").OnClick(() =>
          {
            let name = repository;
            let type = 'github';
            addNewProject({
              name,
              type,
              endpoint,
              accessToken,
              repository,
              branch
            });
          });
        }, err => 
        {
          output.html(JSON.stringify(err, null, 2));
        });
      });      
    }, err => 
    {
      output.html(JSON.stringify(err, null, 2));
    });
  });
};
