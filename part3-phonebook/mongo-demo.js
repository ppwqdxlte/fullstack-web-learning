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
/*
* ...net/${数据库名称}?retryWrites... 如果没写，默认就是test数据库
* 比如/myFirstDatabase?...那么就会在cluster中自动创建一个名为myFirstDatabase的数据库（如果第一次执行这个名称的url）
* */
const url = `mongodb+srv://laowang:${password}@my1stcluster.flysgcs.mongodb.net/?retryWrites=true&w=majority`

Mongoose.connect(url).then(() => console.log('连接成功')).catch(err => console.log(err.message))

const personSchema = new Mongoose.Schema({
    name: String,
    number: String
})

const Person = Mongoose.model('Person', personSchema)

const person = new Person({
    name: '张一鸣',
    number: '21-23-2362172'
})

person.save().then(result => {
    console.log('person saved!', result.toString())
    Mongoose.connection.close(() => console.log('连接关闭'))
})

/*Person.find({}).then(result =>{
    result.forEach( p =>{
        console.log(p)
    })
    Mongoose.connection.close(()=>console.log('连接关闭'))
})*/
