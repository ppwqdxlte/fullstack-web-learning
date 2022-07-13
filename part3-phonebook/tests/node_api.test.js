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
/*
*尽管我们使用了async/await语法，我们的解决方案并没有像我们预期的那样工作。测试执行在数据库初始化之前就开始了!
问题是forEach循环的每个迭代都会产生自己的异步操作，而beforeEach不会等待它们执行完毕。换句话说，在forEach循环内部定义的await命令不在beforeEach函数中，而是在beforeEach不会等待的独立函数中。
由于测试的执行是在beforeEach执行完毕后立即开始的，所以测试的执行是在数据库状态被初始化之前开始的。
解决这个问题的一个方法是用【 Promise.all方法 】来等待所有的异步操作执行完毕。
*
* 使用Promise.all方法时，数组中每个承诺的返回值仍然可以被访问。
* 如果我们用await语法const results = await Promise.all(promiseArray)来等待承诺的解析，
* 该操作将返回一个数组，其中包含promiseArray中每个承诺的解析值，并且它们的出现顺序与数组中的承诺相同。

Promise.all以并行方式执行它收到的承诺。如果这些承诺需要以特定的顺序执行，这将是有问题的。
* 在这样的情况下，可以在【 for...of块 】内执行操作，这样可以保证一个特定的执行顺序。
*
* JavaScript的异步性可能会导致令人惊讶的行为，为此，在使用async/await语法时，
* 一定要仔细注意。即使该语法使处理承诺变得更容易，但仍然有必要了解承诺是如何工作的!
* */
beforeEach(async () => {
    await Person.deleteMany({})
    /* 错误方法：
        helper.initialPersons.forEach(async (p) => {
         let pO = new Person(p)
         await pO.save()
     })*/
    /*
    只初始化数据是正确的方法，但是不能保证承诺执行顺序：
    const personsObj = helper.initialPersons.map(p => new Person(p))
    const promiseArr = personsObj.map(po => po.save())
    await Promise.all(promiseArr)*/
    for (let person of helper.initialPersons) {
        let personObj = new Person(person)
        await personObj.save()
    }
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