#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var exec = require('child_process').exec;
var path = require('path');
var ncp = require('ncp').ncp;
var mkdirp = require('mkdirp');
var currentPath = process.cwd();
var fs = require('fs');

program
  .version('0.0.1', '-v, --version')
  .description('cli tool for unicorn-plus-plus')
  .command('new:standard [name]', 'create a new project', { executableFile: 'upp-new-standard' })
  .parse(process.argv);