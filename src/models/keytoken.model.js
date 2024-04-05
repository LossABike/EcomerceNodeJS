'use strict'

const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'key'
const COLLECTION_NAME = 'keys'

var keyTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Shop'
    },
    privateKey: {
        type: String,
        required: true,
    },
    publicKey: {
        type: String,
        required: true,
    },
    //detect hacker
    //check refresh token used
    refreshToken: {
        type: Array,
        default: []
    },
    
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

module.exports = model(DOCUMENT_NAME,keyTokenSchema)
