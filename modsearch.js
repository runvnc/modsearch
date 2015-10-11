#!/usr/bin/env node
var keywords = process.argv.slice(2);
var run = __dirname+'/node_modules/node-modules/app.js';
var progargs = ['search'].concat(keywords);
var kexec = require('kexec');
kexec(run, progargs);
