'use strict'

//5s
const _SECONDS = 5000

const os = require('os')
const process = require('process')
//count Connect
const mongoose = require('mongoose')
const countConnect = () => {
    const numConnection = mongoose.connections.length
    // console.log(`Number of connections::${numConnection}`)
}

//check overload connect
const checkOverload = () => {
    setInterval(() => {
        const numConnections = mongoose.connections.length
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        //example maxium number of connection based on number of cores
        const maxConnections = numCores * 5

        // console.log(`Activate connections::${numConnections}`);
        // console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`)

        // if (numConnections > maxConnections) {
        //     console.log("connection overload detected!")
        //     //send notify.....
        // }

    },_SECONDS) // monitor every 5 seconds
}
module.exports = {
    countConnect,
    checkOverload
}