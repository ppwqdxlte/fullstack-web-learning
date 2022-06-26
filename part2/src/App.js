const Note = ({note}) =>
    <li>
        {note.date}<br/>{note.content}
    </li>
const App = ({notes}) =>
    <>
        <h1>Notes</h1>
        <ul>
            {/*不推荐用(..., i)=>...带索引的方式，有大大问题*/}
            {notes.map(note =>
                <Note key={note.id} note={note} />
            )}
        </ul>
    </>

export default App;
