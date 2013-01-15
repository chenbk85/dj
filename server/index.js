(function () {
  "use strict";

  var connect = require('connect')
    , server
    ;

  server = connect.createServer()
    .use(connect.favicon(__dirname + '/../public/favicon.ico'))
    .use(connect.static(__dirname + '/../public'))
    ;

  module.exports = server;
}());
