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

let persons = [
    {"id": 1, "name": "Arto Hellas", "number": "040-123456"},
    {"id": 2, "name": "Ada Lovelace", "number": "39-44-5323523"},
    {"id": 3, "name": "Dan Abramov", "number": "12-43-234345"},
    {"id": 4, "name": "Mary Poppendieck", "number": "39-23-6423122"}
]
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
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (!person) {
        res.status(204).end()
    } else {
        persons = persons.filter(p => p.id !== id)
        res.json(person).end()
    }
})
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 1
}

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
    const id = generateId()
    const number = body.number
    const newPerson = {id, name, number}
    res.json(newPerson)
    persons = persons.concat(newPerson)
})

app.put('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    if (!persons.find(p => p.id === id)) {
        res.status(404).send({error: 'Donnot have this ID!'}).end(() => console.error('ID不存在！！'))
        return
    }
    const body = req.body
    res.json(body)
    persons = persons.filter(p => p.id === id ? {id: req.params.id, name: body.name, number: body.number} : p)
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