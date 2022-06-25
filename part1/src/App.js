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
    const [left, setLeft] = useState(0)
    const [right,setRight] = useState(0)
    const [allClicks,setAll] = useState([])
    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }
    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
    }
    return (
        <>
            {left}
            <Button onClick={handleLeftClick} text={'left'} />
            {right}
            <Button onClick={handleRightClick} text={'right'} />
            <History allClicks={allClicks} />
        </>
    )
}

export default App;
