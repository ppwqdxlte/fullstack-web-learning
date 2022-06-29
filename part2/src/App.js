import {useState, useEffect} from "react";
import axios from 'axios'
import Note from './components/Note'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('add a new note...')
    const [showAll, setShowAll] = useState(true)
    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        setNotes(notes.concat({
            id: notes.length + 1,
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5
        }))
        setNewNote('')
    }

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                console.log('promise fulfilled')
                setNotes(response.data)
            })
    }, [])
    console.log('render', notesToShow.length, 'notes')

    return (
        <>
            <h1>Notes</h1>
            <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'all' : 'important'}</button>
            {notesToShow.map(note =>
                <ul key={note.id}>
                    <Note note={note}/>
                </ul>
            )}
            <form  onSubmit={addNote}>
                <input onChange={handleNoteChange} value={newNote}/>
                <button type='submit'>添加</button>
            </form>
        </>
    )
}

export default App;
