import React from 'react'

const Note = ({note}) =>
  <li>
      {note.content}<br />{note.date}
  </li>

export default Note
