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
    const [clicks,setClicks] = useState({
        left:0, right:0
    })
    const handleLeftClick = () => setClicks({
        ...clicks,
        left: clicks.left + 1
    })
    const handleRightClick = () => setClicks({
        ...clicks,
        right: clicks.right + 1
    })
    return (
        <>
            { clicks.left }
            <Button onClick={ handleLeftClick } text={'left'} />
            { clicks.right }
            <Button onClick={ handleRightClick } text={'right'} />
        </>
    )
}

export default App;
