import {useState, useEffect} from "react";
import axios from 'axios';
import Person from "./components/Person";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newPerson, setNewPerson] = useState('add a new note...')
    const [showAll, setShowAll] = useState(true)
    const personsToShow = showAll ? persons : persons.filter(person => Math.random() * person.id <= 0.5 * person.id)

    const handlePersonChange = (event) => {
        setNewPerson(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        setPersons(persons.concat({
            id: persons.length + 1,
            number: (''.concat(Math.floor(Math.random() * 100)).padStart(2, '0')).concat('-')
                .concat(''.concat(Math.floor(Math.random() * 100)).padStart(2, '0')).concat('-')
                .concat(''.concat(Math.floor(Math.random() * 10000000)).padStart(7, '0')),
            name: newPerson
        }))
        setNewPerson('')
    }

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])
    console.log('render', personsToShow.length, 'persons')

    return (
        <>
            <h1>Persons</h1>
            <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'all' : 'important'}</button>
            {personsToShow.map(person =>
                <ul key={person.id}>
                    <Person person={person}/>
                </ul>
            )}
            <form onSubmit={addPerson}>
                <input onChange={handlePersonChange} value={newPerson}/>
                <button type='submit'>添加</button>
            </form>
        </>
    )
}

export default App;
