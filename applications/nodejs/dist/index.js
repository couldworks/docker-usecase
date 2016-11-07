'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _hapi2.default.Server();

server.connection({ port: 3000, host: 'localhost' });

server.register(_inert2.default, function (err) {
  server.route({
    method: 'GET',
    path: '/api/{filter?}',
    handler: function handler(request, reply) {
      reply(_query2.default.getAll());
    }
  });

  server.route({
    method: 'POST',
    path: '/api/',
    handler: function handler(request, reply) {
      var task = _query2.default.create(request.payload).then(function (task) {
        reply(task);
      }).error(function (error) {
        console.log(error);
      });
    }
  });

  server.route({
    method: 'PUT',
    path: '/api/',
    handler: function handler(request, reply) {
      _query2.default.update(request.payload).then(function (task) {
        reply(request.payload);
      });
    }
  });

  server.route({
    method: 'DELETE',
    path: '/api/{id}',
    handler: function handler(request, reply) {
      _query2.default.delete(request.params.id).then(function (value) {
        reply();
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public',
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