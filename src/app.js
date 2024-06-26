require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const { default: helmet } = require('helmet')
const compression = require('compression')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// init middleware
app.use(morgan("dev"))
//morgan have 5 mode//
//dev - combined (product recommend)- common - short - tiny
app.use(helmet());
//helmet defend attack by hacker when track api framework (header X-Powered-By)
//hacker know framework and find exploit
app.use(compression())


//compression reduce data sending to client

//init db
require('./dbs/init.mongodb')
const { checkOverload } = require('./helpers/check.connect')
checkOverload()

//init routes
// app.get('/', (req, res, next) => {
//     const strCompress = 'Hi Hieu Ne'
//     return res.status(200).json({
//         message: "Welcom Azure",
//         //metadata: strCompress.repeat(1000000)
//     })
// })
app.use('',require('./routes'))

//handle errors
module.exports = app