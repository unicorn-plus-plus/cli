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

program
  // .option('-p, --project <name>', 'create project with specific name')
  .parse(process.argv);

var project = program.args;
console.log(chalk.red('The project name is', project));