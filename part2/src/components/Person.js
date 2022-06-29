import React from "react";

const Person = ({person}) => (
    <li>
        {person.id}<br />
        {person.number}<br />
        {person.name}
    </li>
)

export default Person