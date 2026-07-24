import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import "./Noteform.css";

function NoteForm({addNote ,editingNote,
  setEditingNote,handleUpdate}){
    const [title,setTitle]=useState("")
    const [content, setContent] = useState("")

    useEffect(() => {
  if (editingNote) {
    setTitle(editingNote.title);
    setContent(editingNote.content);
  }
}, [editingNote]);

   const handleSubmit = () => {
       if (!title.trim() || !content.trim()) {
         toast.error("Please fill all fields");
          return;
       }

       const noteData = {
       title: title.trim(),
       content: content.trim(),
      };

      if (editingNote) {
        handleUpdate(editingNote._id, noteData);
      } 
      else {
    addNote(noteData);
     }

     setTitle("");
     setContent("");
  };

    const handleCancel = () => {
    setEditingNote(null);
    setTitle("");
    setContent("");
  };

    return(
        <div className="note-form">
            <input type="text" placeholder="Enter note title" value={title}  onChange={(e) => setTitle(e.target.value)}/>

            <br/><br/>

            <textarea placeholder="Write your note..."  value={content}  onChange={(e) => setContent(e.target.value)}> </textarea>
            <br/><br/>
          <div className="form-buttons">
             <button onClick={handleSubmit}>
             {editingNote ? "Update Note" : "Add Note"}
             </button>

             {editingNote && (
             <button onClick={handleCancel}>
             Cancel
             </button>
             )}
              </div>
        </div>
    )
}

export default NoteForm;