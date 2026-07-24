import "./NoteList.css";


function NoteList({ notes,onDelete,onEdit }) {
    if (notes.length === 0) {
    return (
      <div className="empty-state">
        <h2>📝 No Notes Found</h2>
        <p>Create your first note or try another search.</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      <h2>My Notes</h2>

      {notes.map((note, index) => (
        <div className="note-card" key={note._id}>

          <div className="note-content">
          <h3>{note.title}</h3>
          <p>{note.content}</p>
           </div>

        <div className="note-actions">
          <button className="edit-btn" onClick={() => onEdit(note)}>
      Edit
    </button>
    
          <button className="delete-btn" onClick={() => onDelete(note._id)}>
      Delete
    </button>
    </div>
        
        </div>
      ))}
    </div>
  );
}

export default NoteList;