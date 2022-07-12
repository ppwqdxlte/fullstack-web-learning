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

personsRouter.get('/', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

personsRouter.get('/info', (req, res) => {
    Person.find({}).then(persons => {
        const len = persons.length
        const ts = new Date().toLocaleTimeString()
        res.send(`<p>Phonebook has info for ${len} people</p>
                    <p>${ts}</p>`)
    })
})

personsRouter.get('/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).json({error: `${req.params.id} person is not found!`}).end()
            }
        })
        .catch(error => next(error))
})
/*
* https://blog.csdn.net/niulinbiao/article/details/119644096
* 例子里Router和Controller分离，router指定路由以及验证规则
* controller是具体的操作方法，本persons.js尚未分层
* */
personsRouter.post('/', (req, res, next) => {
    const body = req.body
    if (!body) {
        res.status(204).end(() => logger.error('没东西添加什么啊？！'))
        return
    }
    Person.find({}).then(persons => {
        if (persons.find(p => p.name === body.name)) {
            res.status(400).send({error: 'name must be unique'}).end(() => logger.error('电话簿已经重名了'))
            return
        }
        const person = new Person({
            name: body.name,
            number: body.number
        })
        person.save()
            .then(savedPerson => {
                res.json(savedPerson)
            })
            .catch(error => next(error))
    })
})

personsRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                res.json(result)
            } else {
                res.status(204).end(() => logger.error(`Fail to delete person of ${id} that does not exit!`))
            }
        })
        .catch(error => next(error))
})

personsRouter.put('/:id', (req, res, next) => {
    const id = req.params.id
    const modifiedPerson = {
        name: req.body.name,
        number: req.body.number
    }
    Person.findByIdAndUpdate(id, modifiedPerson, {new: true, runValidators: true, context: 'query'})
        .then(result => {
            if (result) {
                res.json(result)
            } else {
                res.status(204).end(() => logger.error(`Fail to update person of ${id} that does not exit!`))
            }
        })
        .catch(error => next(error))
})

module.exports = personsRouter