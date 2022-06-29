import {useState, useEffect} from "react";
import axios from 'axios';
import Person from "./components/Person";
import DeepCopy from "./components/DeepCopy";
import MyInput from "./components/MyInput"

const App = () => {
    const [persons, setPersons] = useState([])
    const [showAll, setShowAll] = useState(true)
    const personsToShow = showAll ? persons : persons.filter(person => Math.random() * person.id <= 0.5 * person.id)
    /*  input的状态钩子以及本身都单独拿到MyInput组件中，防止onChange反复刷新App组件造成卡顿闪烁
          const handleInputChange = (event) => {
          setNewPerson(event.target.value)
      }*/
    let np = {id: '', name: '', number: ''}
    const addPerson = (event) => {
        event.preventDefault()
        np.number = (''.concat((Math.floor(Math.random() * 100).toString())).padStart(2, '0')).concat('-')
            .concat(''.concat((Math.floor(Math.random() * 100).toString())).padStart(2, '0')).concat('-')
            .concat(''.concat((Math.floor(Math.random() * 10000000).toString())).padStart(7, '0'))
        //setNewPerson('') Input状态改变都放在单独的MyInput组件中
        //我就是试试 function deepCopy()方法单独作为组件拿出来好不好用，答案是YES，very good!
        const np2 = DeepCopy(np)
        //持久化到json-server
        axios
            .post('http://localhost:3001/persons', np2)
            .then(response => {
                console.log('添加成功', response)
                //刷新页面列表
                axios
                    .get('http://localhost:3001/persons')
                    .then(response => {
                        setPersons(response.data)
                    })
            })
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
                <MyInput obj={np}/>
                <button type='submit'>添加</button>
            </form>
        </>
    )
}

export default App;
