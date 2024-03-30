"use strict";

const mongoose = require("mongoose");
const { db: {host,port,name }} = require("../configs/config.mongodb")
const connectString = `mongodb://${host}:${port}/${name}`;
const { countConnect } = require("../helpers/check.connect");


//use singleton parttern to set only one connect established
class Database{
    
    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        if (1 === 0) {
          mongoose.set("debug", true);
          mongoose.set("debug", { color: true });
        }

        mongoose
            .connect(connectString, {
              maxPoolSize: 50
          })
          .then((_) => console.log(`Connected Mongod Success `, countConnect()))
          .catch((err) => console.log(`Error Connect!`));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()

module.exports = instanceMongodb;
