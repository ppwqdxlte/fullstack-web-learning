const mongoose = require('mongoose')
/*  定义环境变量的值有很多种方法：
*       1. MONGODB_URI= address_here npm run dev
*       2. dotenv库
* */
const url = process.env.MONGODB_URL
console.log('Mongodb-url is:', url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
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
