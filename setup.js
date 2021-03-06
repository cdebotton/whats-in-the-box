'use strict';

var exec = require('child_process').exec,
    sysPath = require('path'),
    fs = require('fs'),
    mode = process.argv[2],
    fsExistSync = fs.fsExistSync || sysPath.fsExistSync;

var execute = function(path, params, callback) {
  if (callback == null) callback = function() {};
  var command = path + ' ' + params;
  console.log('Executing', command);
  exec(command, function(error, stdout, stderr) {
    if (error != null) return process.stderr.write(stderr.toString());
    console.log(stdout.toString());
    callback();
  });
};

switch(mode) {
  case 'update':
    execute('curl https://codeload.github.com/cdebotton/whats-in-the-box/zip/master', '> master.zip', function() {
      execute('unzip', 'master.zip', function() {
        execute('rm', 'master.zip');
        execute('cp', '-fpRv whats-in-the-box-master/app/framework ./app');
        execute('cp', '-fpRv whats-in-the-box-master/test ./');
        execute('cp', '-fpRv whats-in-the-box-master/brunch-config.js ./brunch-config.js');
        execute('cp', '-fpRv whats-in-the-box-master/setup.js ./setup.js');
        execute('cp', '-fpRv whats-in-the-box-master/generators ./', function() {
          execute('rm', '-rf whats-in-the-box-master');
          execute('npm', 'update', function() {
            execute('bower', 'update');
          });
        });
      });
    });
    break;
}
