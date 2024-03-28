"use strict";

const mongoose = require("mongoose");

const connectString = `mongodb://localhost:27017/ShopAzure`;


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
          .connect(connectString)
          .then((_) => console.log(`Connected Mongod Success`))
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
