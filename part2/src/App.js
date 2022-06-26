const App = (props) => {
    const {notes} = props
    return (
        <>
            <h1>Notes</h1>
            <ul>
                {notes.map(note =>
                    <li key={note.id}>
                        {note.date}<br/>{note.content}
                    </li>
                )}
            </ul>
        </>
    )
}

export default App;
