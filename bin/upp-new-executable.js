#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var exec = require('child_process').exec;
var path = require('path');
var ncp = require('ncp').ncp;
var mkdirp = require('mkdirp');
var currentPath = process.cwd();
var fs = require('fs');
var rimraf = require('rimraf');
const del = require('del');

// MAIN
program
  // .option('-p, --project <name>', 'create project with specific name')
  .parse(process.argv);
var project = program.args;
checkExistingFolder();
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
  exec('git clone https://github.com/unicorn-plus-plus/boilerplate-executable.git',
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
  del.sync(['boilerplate-executable/.git']);
  decompressRepo();
}

function decompressRepo() {
  console.log(chalk.green('STEP 4: Decompressing.'));
  ncp(currentPath + "/boilerplate-executable", currentPath + "/", function (err) {
    if (err instanceof Error && err !== null) {
      console.error(chalk.red(err.message));
    } else {
      postProcessing();
    }
  });
}

function postProcessing() {
  console.log(chalk.green('STEP 5: Post-processing.'));
  del.sync(['boilerplate-executable']);
  console.log(chalk.green('Done!'));
}