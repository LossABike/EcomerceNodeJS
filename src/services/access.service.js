'use strict'

const shopModel = require('../models/shop.model')
const bycrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService  = require("./keyToken.service");
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils/index');
const RoleShop = {
    SHOP: ' SHOP',
    WRITER: '00001',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {
    
    static signUp = async ({ name, email, password }) => {
        try {
            //step1 check email exists
            //use lean return obj js original or not use return obj mongo
            const holderShop = await shopModel.findOne({ email }).lean()
            if (holderShop) {
                return {
                    code: 'xxxx',
                    message: 'Shop already registered!'
                }
            }
            
            const passwordHash = await bycrypt.hash(password,10)

            const newShop = await shopModel.create({
                name , email , password:passwordHash , roles:[RoleShop.SHOP]
            })
            //step2 create key
            if (newShop) {
                
                const privateKey = crypto.randomBytes(64).toString("hex");
                const publicKey = crypto.randomBytes(64).toString("hex");

                //store db publicKey
                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey,
                });
                //check publicKey not exists
                if (!keyStore) {
                    return {
                        code: "xxxxx",
                        message: "keyStore error",
                    };
                }
                
                //created token pair
                const tokens = await createTokenPair({
                    userId: newShop._id,
                    email
                },
                    publicKey,
                    privateKey
                )

                console.log(`created Token Success`, tokens)
                
                return {
                  code: 201,
                  metadata: {
                    shop: getInfoData({fields:['_id','name','email'],object:newShop}),
                    tokens,
                  },
                };

            }
            return {
              code: 200,
              metadata: null,
            };

        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService