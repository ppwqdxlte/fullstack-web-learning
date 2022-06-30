import {useState, useEffect} from "react";
import Person from "./components/Person";
import MyInput from "./components/MyInput";
import entryService from "./services/entries";

const App = () => {
    const [persons, setPersons] = useState([])
    const [showAll, setShowAll] = useState(true)
    const personsToShow = showAll ? persons : persons.filter(person => Math.random() * person.id <= 0.5 * person.id)

    let np = {id: '', name: '', number: ''}
    const addPerson = (event) => {
        event.preventDefault()
        np.number = (''.concat((Math.floor(Math.random() * 100).toString())).padStart(2, '0')).concat('-')
            .concat(''.concat((Math.floor(Math.random() * 100).toString())).padStart(2, '0')).concat('-')
            .concat(''.concat((Math.floor(Math.random() * 10000000).toString())).padStart(7, '0'))

        entryService.create('http://localhost:3001/persons',np)
            .then(response => {
                console.log('添加成功', response)
                setPersons(persons.concat(response.data))
            })
    }

    useEffect(() => {
        console.log('effect')
        entryService.getAll('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])

    console.log('render', personsToShow.length, 'persons')

    const toggleStarOf = (id) => {
        const person = persons.find(p => p.id === id)
        const pn1 = person.number.substring(0,1)
        const changedPerson = {...person, number:
                (pn1%2===0?(parseInt(pn1)+1):(parseInt(pn1)-1)).toString()+person.number.substring(1)}
        entryService.update('http://localhost:3001/persons',id,changedPerson)
            .then(response=>{
            setPersons(persons.map(p=>p.id!==id?p:response.data))
        })
    }

    return (
        <>
            <h1>Persons</h1>
            <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'all' : 'important'}</button>
            {personsToShow.map(person =>
                <ul key={person.id}>
                    <Person person={person} toggleStar={() => toggleStarOf(person.id)}/>
                </ul>
            )}
            <form onSubmit={addPerson}>
                <MyInput obj={np}/>
                <button type='submit'>添加</button>
            </form>
        </>
    )
}

export default App;
