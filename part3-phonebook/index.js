const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)

//  mongoose 服务
const mongoose = require('mongoose')
if (process.argv.length < 3) {
    console.log('mongodb密码呢？你踏马的吃了吗？？！')
    process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://laowang:${password}@my1stcluster.flysgcs.mongodb.net/?retryWrites=true&w=majority`
const personSchema = new mongoose.Schema({
    name: String, number: String
})
personSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = document._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})
const Person = mongoose.model('Person', personSchema)
/*  初始化电话簿数组    */
let persons = []
mongoose.connect(url).then(() => {
    console.log('init连接成功')
    Person.find({}).then(result => {
        result.forEach(p => {
            console.log(p)
            persons.push(p)
        })
        mongoose.connection.close(() => console.log('init连接关闭'))
    }).catch(err => console.log(err))
}).catch(err => console.log(err.message))

app.get('/', (req, res) => {
    res.send(`<h1>Phonebook</h1>`)
})
app.get('/api/persons', (req, res) => {
    res.json(persons)
})
app.get('/info', (req, res) => {
    const len = persons.length
    const ts = new Date().toLocaleString()
    res.send(`<p>Phonebook has info for ${len} people</p>
                    <p>${ts}</p>`)
})
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (!person) {
        res.status(404).send(`<h3>Person of id ${id} is not found~</h3>`).end()
    } else {
        res.json(person)
    }
})
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    if (!persons.find(p => p.id === id)) {
        res.status(204).end()
    } else {
        //mongodb中删除person
        mongoose.connect(url).then(() => {
            console.log('delete连接打开')
            Person.findByIdAndDelete(id).then(result => {
                persons = persons.filter(p => p.id !== id) //内存中删除person
                res.json(result.toJSON()).end()             //返回响应
            }).catch(err => {
                console.log('删除失败，因为', err.message)
            }).finally(() => mongoose.connection.close(() => console.log('delete连接关闭')))
        }).catch(() => console.log('因为连接不上数据库导致删除失败'))
    }
})
app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body) {
        res.status(204).end(() => console.error('没东西添加什么啊？！'))
        return
    }
    const name = body.name
    if (!name) {
        res.status(400).send({error: 'should have a name!'}).end(() => console.error('name为空！！'))
        return
    }
    if (persons.find(p => p.name === name)) {
        res.status(400).send({error: 'name must be unique'}).end(() => console.log('电话簿已经重名了'))
        return
    }
    const number = body.number
    const newPerson = new Person({name, number})
    //添加到mongodb Atlas数据库里面，连接、关闭 不可少！
    mongoose.connect(url).then(() => {
        console.log('add连接成功')
        newPerson.save().then(result => {
            persons = persons.concat(result) //刷新内存
            res.json(result.toJSON())
        }).catch(err => {
            console.log('添加失败，因为', err.message)
        }).finally(() => mongoose.connection.close(() => console.log('add连接关闭')))
    }).catch(e => console.log('add连接失败', e.message))
})
app.put('/api/persons/:id', (req, res) => {
    const id = req.params.id
    if (!persons.find(p => p.id === id)) {
        res.status(404).send({error: 'Donnot have this ID!'}).end(() => console.error('ID不存在！！'))
        return
    }
    /*   更新的时候，更新的内容不能是 doc文档，只能是普通的{}对象   */
    const modifiedPerson = {
        name: req.body.name,
        number: req.body.number
    }
    //修改mongodb中的对应记录
    mongoose.connect(url).then(() => {
        console.log('update连接成功')
        Person.findByIdAndUpdate(id, modifiedPerson, {new: true}).then(result => {
            res.json(result.toJSON())   //返回响应
            persons = persons.filter(p => p.id === id ? {id: result._id, name: result.name, number: result.number} : p)
        }).catch(err => {
            console.log('更新失败，因为', err.message)
        }).finally(() => mongoose.connection.close(() => console.log('update连接关闭')))
    }).catch(err => console.log('update连接失败', err.message))
})

/*
        这不就是【拦截器】嘛！代码位置非常有讲究！
        中间件放在app路由函数之前就是处理HTTP请求之前拦截，
        中间件放在app路由函数之后就是处理完HTTP后拦截
*/
const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

const PORT = 3003
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))