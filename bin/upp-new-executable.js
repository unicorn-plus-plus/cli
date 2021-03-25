#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var exec = require('child_process').exec;
var currentPath = process.cwd();
var fs = require('fs');
const del = require('del');
const replace = require('replace-in-file');
const fse = require('fs-extra');

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
  try {
    fse.copySync(currentPath + "/boilerplate-executable", currentPath + "/")
    postProcessing();
  } catch (err) {
    console.error(chalk.red(err.message));
  }
}

function postProcessing() {
  console.log(chalk.green('STEP 5: Post-processing.'));
  try {
    replace.sync({
      files: 'CMakeLists.txt',
      from: "TBR_PROJECT_NAME",
      to: project,
    });
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
  del.sync(['boilerplate-executable']);
  console.log(chalk.green('Done!'));
}