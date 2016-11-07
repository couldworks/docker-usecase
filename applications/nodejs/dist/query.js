'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _orientjs = require('orientjs');

var _orientjs2 = _interopRequireDefault(_orientjs);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var data = [{
  id: _nodeUuid2.default.v1(),
  title: 'Comunicação rest',
  completed: false
}, {
  id: _nodeUuid2.default.v1(),
  title: 'Configuração server',
  completed: true
}];

var Query = function () {
  function Query() {
    _classCallCheck(this, Query);
  }

  _createClass(Query, [{
    key: '_createConnection',
    value: function _createConnection() {
      return (0, _orientjs2.default)({
        host: 'localhost',
        port: 2424,
        username: 'root',
        password: 'root'
      });
    }
  }, {
    key: '_createSession',
    value: function _createSession() {
      return this._createConnection().use({
        name: 'todo',
        username: 'root',
        password: 'root'
      });
    }
  }, {
    key: 'getUrl',
    value: function getUrl() {
      return url;
    }
  }, {
    key: 'getAll',
    value: function getAll() {
      return this._createSession().query('select * from task');
    }
  }, {
    key: 'getById',
    value: function getById(id) {
      return this._createSession().query('select * from task where id = :id', {
        params: { id: id }
      });
    }
  }, {
    key: 'update',
    value: function update(task) {
      return this._createSession().update(task['@rid']).set({
        title: task.title,
        completed: task.completed
      }).one();
    }
  }, {
    key: 'create',
    value: function create(task) {
      var newTask = {
        id: _nodeUuid2.default.v1(),
        title: task.title,
        completed: task.completed };

      return this._createSession().insert().into('task').set(newTask).one();
    }
  }, {
    key: 'delete',
    value: function _delete(task) {
      return this._createSession().delete().from('task').where('id ="' + task + '"').limit(1).scalar();
    }
  }, {
    key: 'open',
    value: function open() {
      return this._createConnection();
    }
  }]);

  return Query;
}();

exports.default = new Query();