#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var exec = require('child_process').exec;
var currentPath = process.cwd();
var fs = require('fs');
const del = require('del');
const replace = require('replace-in-file');
const fse = require('fs-extra');
const { exit } = require('process');

// fixed parameters
const repoName = "boilerplate-interface";

// MAIN
program
  .requiredOption('-n, --namespace <namespace>', 'specify the namespace')
  .parse(process.argv);
var project = program.args;
var options = program.opts();
checkExistingFolder();
// postProcessing();
// END MAIN

function checkExistingFolder() {
  console.log(chalk.green('STEP 1: Checking if folder', project, 'already exist.'));
  if (fs.existsSync(currentPath + "/" + project))
    console.error(chalk.red("Folder already exist."));
  else
    cloneRepo();
}

function cloneRepo() {
  console.log(chalk.green('STEP 2: Downloading the boilerplate.'));
  exec('git clone https://github.com/unicorn-plus-plus/' + repoName + '.git',
    function (err, out, code) {
      if (err instanceof Error && err !== null) {
        console.error(chalk.red(err.message));
      } else {
        preProcessing();
      }
    });
}

function preProcessing() {
  console.log(chalk.green('STEP 3: Pre-processing.'));
  del.sync([repoName + '/.git']);
  decompressRepo();
}

function decompressRepo() {
  console.log(chalk.green('STEP 4: Decompressing.'));
  try {
    fse.copySync(currentPath + "/" + repoName, currentPath + "/");
    fse.renameSync(currentPath + "/include/TBR_NAMESPACE/", currentPath + "/include/" + options.namespace + "/");
    fse.renameSync(currentPath + "/include/TBR_NAMESPACE.hpp", currentPath + "/include/" + options.namespace + ".hpp");
  } catch (err) {
    console.error(chalk.red(err.message));
  }
  postProcessing();
}

function postProcessing() {
  console.log(chalk.green('STEP 5: Post-processing.'));
  try {
    replace.sync({
      files: 'upp.json',
      from: /TBR_NAMESPACE/g,
      to: options.namespace,
    });
    replace.sync({
      files: 'upp.json',
      from: /TBR_NAME/g,
      to: project,
    });
    replace.sync({
      files: 'src/SimpleClass.json',
      from: /TBR_NAMESPACE/g,
      to: options.namespace,
    });
    replace.sync({
      files: 'include/' + options.namespace + '.hpp',
      from: /TBR_NAMESPACE/g,
      to: options.namespace,
    });
    replace.sync({
      files: 'include/' + options.namespace + '/SimpleClass.hpp',
      from: /TBRU_NAMESPACE/g,
      to: options.namespace.toUpperCase(),
    });
    replace.sync({
      files: 'include/' + options.namespace + '/SimpleClass.hpp',
      from: /TBR_NAMESPACE/g,
      to: options.namespace,
    });
    replace.sync({
      files: 'src/SimpleClass.cpp',
      from: /TBR_NAMESPACE/g,
      to: options.namespace,
    });
    replace.sync({
      files: 'apps/example.cpp',
      from: /TBR_NAMESPACE/g,
      to: options.namespace,
    });
    replace.sync({
      files: 'tests/src/SimpleClassTest.cpp',
      from: /TBR_NAMESPACE/g,
      to: options.namespace,
    });
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
  del.sync([repoName]);
  console.log(chalk.green('Done!'));
}