'use strict';

const EventEmitter = require('events').EventEmitter;

class Driver extends EventEmitter{

    constructor(db_name, options){
        this._name = options.name;
        this._host = options.host;
        this._port = options.port;
        this._db_user = options.db_user;
        this._db_pass = options.db_pass;
        this._db_name = db_name;
    }

    get name(){
        return this._name;
    }
    get host(){
        return this._host;
    }

    get port(){
        return this._port;
    }

    get db_user(){
        return this._db_user;
    }

    get db_pass(){
        return this._db_pass;
    }

    get db_name(){
        return this._db_name;
    }
}

module.exports.Driver = Driver;
