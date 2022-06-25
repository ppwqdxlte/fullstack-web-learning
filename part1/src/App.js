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

const History = ({allClicks}) => {
    if (allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        )
    }
    return (
        <div>
            button press history: {allClicks.join(' ')}
        </div>
    )
}

const App = () => {
    const [value,setValue] = useState('打招呼')
    const hello = (props) =>
        () => setValue('Hello,'+props)
    return (
        <>
            {value}
           <Button onClick={hello('World')} text={'点点看'} />
           <Button onClick={hello('React')} text={'点点看'} />
           <Button onClick={hello('LaoWang')} text={'点点看'} />
        </>
    )
}

export default App;
