/*
* 一个微小但重要的细节：在这部分的开头，我们将Express应用提取到app.js文件中，
* index.js文件的作用被改变为在指定端口用Node的内置http对象启动该应用。
* 测试只使用app.js文件中定义的Express应用.
* supertest的文档说如下。
如果服务器还没有监听连接，那么它就会为你绑定一个短暂的端口，所以不需要跟踪端口。
* */
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Person = require('../models/person').Person

beforeEach(async () => {
    await Person.deleteMany({})
    let personObj = new Person(helper.initialPersons[0])
    await personObj.save()
    personObj = new Person(helper.initialPersons[1])
    await personObj.save()
})

/*test('persons are returned as json', async () => {
    await api
        .get('/api/persons')
        .expect(200)
        .expect('Content-Type', /json/)
},0o100000) //jest默认5秒超时，设置久点

test('there are two people', async () => {
    const response = await helper.personsInDb()
    expect(response).toHaveLength(helper.initialPersons.length)
})

test('the first person is lao wang', async () => {
    const response = await helper.personsInDb()
    // execution gets here only after the HTTP request is complete
// the result of HTTP request is saved in variable response
    expect(response[0].name).toBe('大吉大利')
})

test('a specific note is within the returned notes', async () => {
    const response = await helper.personsInDb()
    const names = response.map(r => r.name)
    expect(names).toContain('万事如意')
})

test('a valid person can be added', async () => {
    const newPerson = {name: '早日王者', number: '11-11-1111111'}
    await api
        .post('/api/persons')
        .send(newPerson)
        .expect(200)
        .expect('Content-Type', /json/)
    const res = await helper.personsInDb()
    const names = res.map(r => r.name)
    expect(res).toHaveLength(helper.initialPersons.length + 1)
    expect(names).toContain('早日王者')
})

test('person without name is not added', async () => {
    const newPerson = {number: '111'}
    await api
        .post('/api/persons')
        .send(newPerson)
        .expect(400)
    const res = await helper.personsInDb()
    expect(res).toHaveLength(helper.initialPersons.length)
},10000)*/

afterAll(() => {
    mongoose.connection.close()
})