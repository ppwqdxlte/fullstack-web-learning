/*
* 一个微小但重要的细节：在这部分的开头，我们将Express应用提取到app.js文件中，
* index.js文件的作用被改变为在指定端口用Node的内置http对象启动该应用。
* 测试只使用app.js文件中定义的Express应用.
* supertest的文档说如下。
如果服务器还没有监听连接，那么它就会为你绑定一个短暂的端口，所以不需要跟踪端口。
* */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Person = require('../models/person').Person

const initialPersons = [
    {name: '大吉大利', number: '99-99-9999999'},
    {name: '万事如意', number: '99-99-9999999'}]

beforeEach(async ()=>{
    await Person.deleteMany({})
    let personObj = new Person(initialPersons[0])
    await personObj.save()
    personObj = new Person(initialPersons[1])
    await personObj.save()
})

const api = supertest(app)

test('persons are returned as json', async () => {
    await api
        .get('/api/persons')
        .expect(200)
        .expect('Content-Type', /json/)
}, 90000) //jest默认5秒超时，设置久点

test('there are two people', async () => {
    const response = await api.get('/api/persons')
    expect(response.body).toHaveLength(initialPersons.length)
})

test('the first person is lao wang', async () => {
    const response = await api.get('/api/persons')
    // execution gets here only after the HTTP request is complete
// the result of HTTP request is saved in variable response
    expect(response.body[0].name).toBe('大吉大利')
})

test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/persons')
    const contents = response.body.map(r => r.name)
    expect(contents).toContain(
        '万事如意'
    )
})

afterAll(() => {
    mongoose.connection.close()
})