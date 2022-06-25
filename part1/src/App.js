import {useState} from 'react'

const Hello = ({name,age}) => {
    const bornYear = () => {
        const yearNow = new Date().getFullYear();
        return yearNow - age;
    }

    return (
        <div>
            <p>
                Hello {name}, you are {age} years old
            </p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}

const Footer = () => (
    <div>
        greeting app created by <a href="https://github.com/mluukkai">mluukkai</a>
    </div>
)

const Counter = ({num}) => (
    <div>
        计数器:{num}
    </div>
)


const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const App = () => {
    const name = 'Peter'
    const age = 100
    let [counter, setCounter] = useState(0)
    const increaseByOne = () => setCounter(counter + 1)
    const setToZero = () => setCounter(0)
    const decreaseByOne = () => setCounter(counter - 1)
    return (
        <>
            <h1>Greetings</h1>
            <Hello name="Maya" age={26 + 10}/>
            <Hello name={name} age={age}/>
            <Counter num={counter}/>
            <Button onClick={increaseByOne} text={'加一'}/>
            <Button onClick={setToZero} text={'归零'}/>
            <Button onClick={decreaseByOne} text={'减一'}/>
            <Footer/>
        </>
    )
}

export default App;
