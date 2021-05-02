#!/usr/bin/env node

var program = require('commander');
var packetData = require('../package.json');

program
  .version(packetData.version, '-v, --version')
  .description('cli tool for unicorn-plus-plus')
  .command('new:simple [name]', 'create a new simple project', { executableFile: 'upp-new-executable' })
  .command('new:executable [name]', 'create a new executable project with namespace', { executableFile: 'upp-new-executable' })
  .parse(process.argv);