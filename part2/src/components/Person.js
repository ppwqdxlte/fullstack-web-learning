import React from "react";

const Person = ({person, toggleStar}) => {
    const star = person.number.substring(0,1) % 2 === 0 ? '💖':'💗'
    return (
        <li>
            <button onClick={toggleStar}>{star}</button>
            {person.id}<br/>
            {person.number}<br/>
            {person.name}
        </li>
    )
}

export default Person