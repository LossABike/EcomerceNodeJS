'use strict'

const { apiKey , permission } = require('../auth/checkAuth')
const express = require('express')
const router = express.Router()

//check apiKey
router.use(apiKey)
//check permission
router.use(permission('0000'))

router.use('/v1/api',require('./access'))

module.exports = router