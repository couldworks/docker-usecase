'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _hapi2.default.Server();

server.connection({ port: 3000 });

server.register(_inert2.default, function (err) {

  server.route({
    method: 'GET',
    path: '/{filter}',
    handler: function handler(request, reply) {
      reply();
    }
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '../public',
        listing: true
      }
    }
  });
  server.start(function (err) {

    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  });
});

exports.default = server;