const { Buffer } = require('buffer');

global.Buffer = Buffer;
global.process = require('process');

if (typeof global.btoa === 'undefined') {
  global.btoa = function (str) {
    return Buffer.from(str, 'binary').toString('base64');
  };
}

if (typeof global.atob === 'undefined') {
  global.atob = function (str) {
    return Buffer.from(str, 'base64').toString('binary');
  };
}
