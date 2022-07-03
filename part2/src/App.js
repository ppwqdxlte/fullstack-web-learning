import {useState, useEffect} from "react";
import Person from "./components/Person";
import MyInput from "./components/MyInput";
import entryService from "./services/entries";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const baseUrl = 'http://localhost:3003/api/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errMsg, setErrMsg] = useState(null)//试一试括号内'some thing wrong...'
    const [msg, setMsg] = useState(null)
    const personsToShow = showAll ? persons : persons.filter(person => Math.random() * person.id <= 0.5 * person.id)

    let np = {id: '', name: '', number: ''}
    const addPerson = (event) => {
        event.preventDefault()
        np.number = (''.concat((Math.floor(Math.random() * 100).toString())).padStart(2, '0')).concat('-')
            .concat(''.concat((Math.floor(Math.random() * 100).toString())).padStart(2, '0')).concat('-')
            .concat(''.concat((Math.floor(Math.random() * 10000000).toString())).padStart(7, '0'))

        entryService.create(baseUrl, np)
            .then(response => {
                console.log('添加成功', response)
                setMsg('添加成功')
                setTimeout(() => setMsg(null), 2000)
                setPersons(persons.concat(response.data))
            })
    }

    useEffect(() => {
        console.log('effect')
        entryService.getAll(baseUrl)
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])

    console.log('render', personsToShow.length, 'persons')

    const toggleStarOf = (id) => {
        const person = persons.find(p => p.id === id)
        const pn1 = person.number.substring(0, 1)
        const changedPerson = {
            ...person, number:
                (pn1 % 2 === 0 ? (parseInt(pn1) + 1) : (parseInt(pn1) - 1)).toString() + person.number.substring(1)
        }
        entryService.update(baseUrl, id, changedPerson)
            .then(response => {
                setMsg(`修改了${response.data.id}的number`)
                setTimeout(() => setMsg(null), 2000)
                setPersons(persons.map(p => p.id !== id ? p : response.data))
            })
            .catch(err => {
                console.log(err.message())
                // 【状态消息】
                setErrMsg(`the person '${changedPerson.name}' was already deleted from server`)
                //定时删除或隐藏消息
                setTimeout(() => setErrMsg(null), 5000)

                setPersons(persons.filter(p => p.id !== id))
            })
    }

    const deletePerson = (id) => {
        entryService.deleteEntry(baseUrl, id)
            .then(response => {
                console.log(response.data)
                setMsg(`删除了${response.data.name}的number`)
                setTimeout(() => setMsg(null), 2000)
                setPersons(persons.filter(p=>p.id!==id))
            })
            .catch(err => {
                console.log(err.message())
                setErrMsg(`Fail to delete the person of ID: '${id}'`)
                setTimeout(() => setErrMsg(null), 5000)
            })
    }

    return (
        <>
            <h1>Persons</h1>
            <Notification msg={errMsg} type={'err'}/>
            <Notification msg={msg} type={'normalMsg'}/>
            <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'all' : 'important'}</button>
            {personsToShow.map(person =>
                <ul key={person.id}>
                    <Person person={person} toggleStar={() => toggleStarOf(person.id)}/>
                    <button onClick={() => deletePerson(person.id)}>删除</button>
                </ul>
            )}
            <form onSubmit={addPerson}>
                <MyInput obj={np}/>
                <button type='submit'>添加</button>
            </form>
            <Footer footerName='PersonApp'/>
        </>
    )
}

export default App;
