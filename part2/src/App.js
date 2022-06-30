import {useState, useEffect} from "react";
import axios from 'axios';
import Person from "./components/Person";
import DeepCopy from "./components/DeepCopy";
import MyInput from "./components/MyInput"

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
        //setNewPerson('') Input状态改变都放在单独的MyInput组件中，状态在哪里，就刷新哪里，避免反复闪烁刷新整个App
        //我就是试试 function deepCopy()方法单独作为组件拿出来好不好用，答案是YES，very good!
        const np2 = DeepCopy(np)
        //持久化到json-server
        axios
            .post('http://localhost:3001/persons', np2)
            .then(response => {
                console.log('添加成功', response)
                //刷新页面列表，axios.post方法可以返回新添加的对象，就没必要重新发get请求了
                setPersons(persons.concat(response.data))
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
    //导入函数
    const toggleStarOf = (id) => {
        const url = `http://localhost:3001/persons/${id}`
        const person = persons.find(p => p.id === id)
        const pn1 = person.number.substring(0,1)
        const changedPerson = {...person, number:
                (pn1%2===0?(parseInt(pn1)+1):(parseInt(pn1)-1)).toString()+person.number.substring(1)}
        //console.log(pn1,person,changedPerson)
        axios.put(url,changedPerson).then(response=>{
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
