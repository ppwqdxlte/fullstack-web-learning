const mongoose = require('mongoose')
const MONGODB_URL = require('../utils/config').MONGODB_URL
/*  定义环境变量的值有很多种方法：
*       1. MONGODB_URI= address_here npm run dev
*       2. dotenv库
* */
const url = MONGODB_URL

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true
    },
    number: {
        type: String,
        minLength: 13,
        maxLength: 20,
        required: true
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = document._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = {Person, mongoose, url}
