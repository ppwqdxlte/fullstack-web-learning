/*
* 路由处理程序也被移到一个专门的模块里，路由的事件处理程序通常被称为controllers，
* 所有与 persons 相关的路由现在都在controllers目录下的 persons.js 模块中:
*
* 路由处理程序中的路径已经缩短,路由器实际上是一个中间件，它可以用来在一个地方定义 "相关的路由"，
* app.js文件使用了路由器.
* */
const personsRouter = require('express').Router()
const {Person} = require('../models/person')
const logger = require('../utils/logger')

personsRouter.get('/home', (req, res) => {
    res.send(`<h1>Phonebook</h1>`)
})

personsRouter.get('/', async (req, res) => {
    const persons = await Person.find({})
    res.json(persons)
})

personsRouter.get('/info', async (req, res) => {
    const persons = await Person.find({})
    const len = persons.length
    const ts = new Date().toLocaleTimeString()
    res.send(`<p>Phonebook has info for ${len} people</p>
                    <p>${ts}</p>`)
})

personsRouter.get('/:id', async (req, res, next) => {
    const person = await Person.findById(req.params.id).catch(error => next(error))
    if (person) {
        res.json(person)
    } else {
        res.status(404).json({error: `${req.params.id} person is not found!`}).end()
    }
})
/*
* https://blog.csdn.net/niulinbiao/article/details/119644096
* 例子里Router和Controller分离，router指定路由以及验证规则
* controller是具体的操作方法，本persons.js尚未分层
* */
personsRouter.post('/', async (req, res, next) => {
    const body = req.body
    if (!body) {
        res.status(204).end(() => logger.error('没东西添加什么啊？！'))
        return
    }
    const persons = await Person.find({})
    if (persons.find(p => p.name === body.name)) {
        res.status(400).send({error: 'name must be unique'}).end(() => logger.error('电话簿已经重名了'))
        return
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })
    const savedPerson = await person.save().catch(error => next(error))
    res.json(savedPerson)
})

personsRouter.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    const result = await Person.findByIdAndDelete(id).catch(error => next(error))
    if (result) {
        res.json(result)
    } else {
        res.status(204).end(() => logger.error(`Fail to delete person of ${id} that does not exit!`))
    }
})

personsRouter.put('/:id', async (req, res, next) => {
    const id = req.params.id
    const modifiedPerson = {
        name: req.body.name,
        number: req.body.number
    }
    const result = await Person.findByIdAndUpdate(id, modifiedPerson, {
        new: true,
        runValidators: true,
        context: 'query'
    }).catch(error => next(error))
    if (result) {
        res.json(result)
    } else {
        res.status(204).end(() => logger.error(`Fail to update person of ${id} that does not exit!`))
    }
})

module.exports = personsRouter