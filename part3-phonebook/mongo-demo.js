/*
* 我在mongodb英文官网免费试用了Atlas云服务，
* 建立了一个my1stcluster的集群，这个测试样例用来连接这个集群
* */
const Mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log(` node mongo.js [password] 命令缺少password！`)
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://laowang:${password}@my1stcluster.flysgcs.mongodb.net/?retryWrites=true&w=majority`

Mongoose.connect(url).then(() => console.log('连接成功')).catch(err => console.log(err.message))

const personSchema = new Mongoose.Schema({
    name: String,
    number: String
})

const Person = Mongoose.model('Person', personSchema)

const person = new Person({
    name: '老王',
    number: '88-88-8888888'
})

person.save().then(result=>{
    console.log('person saved!',result.toString())
    Mongoose.connection.close(()=>console.log('连接关闭'))
})