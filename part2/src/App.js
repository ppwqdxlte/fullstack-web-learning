import Note from './components/Note'
import {useState} from "react";

const App = (props) => {
    const [notes,setNotes] = useState(props.notes)
    const [newNote,setNewNote] = useState('a new note...')
    const [showAll,setShowAll] = useState(true)

    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

    const addNote = (event) => {
        event.preventDefault()
        //console.log('button clicked',event.target)
        setNotes(notes.concat({
            id:notes.length + 1,
            content:newNote,
            date:new Date().toISOString(),
            important:Math.random() < 0.5
        }))
        setNewNote('')
    }

    const handleNoteChange = (event) => {
        //console.log(event.target.value)
        setNewNote(event.target.value)
    }
    
    return (
        <>
            <h1>Notes</h1>
            <button onClick={()=>setShowAll(!showAll)}>show {showAll ? 'all' : 'important'}
            </button>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note}/>
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit">保存</button>
            </form>
        </>
    )

}

export default App;
