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
    const [left,setLeft] = useState(0)
    const [right,setRight] = useState(0)

    return (
        <>
            {left}
            <Button onClick={()=>setLeft(left+1)} text={'left'} />
            {right}
            <Button onClick={()=>setRight(right+1)} text={'right'} />
        </>
    )
}

export default App;
