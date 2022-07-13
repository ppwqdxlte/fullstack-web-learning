const Person = require('../models/person').Person

const initialPersons = [
    {name: '大吉大利', number: '99-99-9999999'},
    {name: '万事如意', number: '99-99-9999999'}]

const nonExistingId = async () => {
    const person = new Person({ name: 'willremovethissoon', number: '11-11-1111111' })
    await person.save()
    await person.remove()
    return person._id.toString()
}

const personsInDb = async () => {
    const persons = await Person.find({})
    return persons.map(person => person.toJSON())
}

module.exports = {initialPersons, nonExistingId, personsInDb}