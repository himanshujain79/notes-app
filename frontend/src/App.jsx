import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import './App.css'
import { useState,useEffect } from "react";
import NoteForm from "./components/Noteform";
import NoteList from "./components/Notelist";
import { getNotes,createNote,deleteNote,updateNote } from "../services/api";
import './SearchBar.css'


function App() {

  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

 const addNote = async (newNote) => {
  try {
    await createNote(newNote);
     toast.success("Note added successfully!");
    fetchNotes();
  } catch (error) {
    toast.error("Failed to add note.");
    console.error(error);
    
  }
}
const handleUpdate = async (id, updatedNote) => {
  try {
    await updateNote(id, updatedNote);
      toast.success("Note updated successfully!");
    fetchNotes();
    setEditingNote(null);
  } catch (error) {
    toast.error("Failed to update note.");
    console.error(error);
  }
};

    useEffect(()=>{
    fetchNotes()
  },[])

 const fetchNotes = async () => {
  try {
    setLoading(true);
    setError("")
    const response = await getNotes();
    setNotes(response.data);
  } catch (error) {
    console.error(error);
    setError("Failed to load notes. Please try again.");
  } finally {
    setLoading(false);
    
  }
}

const handleDelete = async (id) => {
  try {
    await deleteNote(id);
     toast.success("Note deleted successfully!")
    fetchNotes();
    toast.success("Note deleted successfully!");
  } catch (error) {
    toast.error("Failed to delete note.");
    console.error(error);
  }
};


if (loading) {
  return <h2>Loading...</h2>;
}
if (error) {
  return <h2>{error}</h2>;
}

const filteredNotes = notes.filter((note) =>
     note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
);
  return (
<>
     <Navbar title="Welcome to NoteLet" />
    <div className="container">
   
    <NoteForm
  addNote={addNote}
  editingNote={editingNote}
  setEditingNote={setEditingNote}
  handleUpdate={handleUpdate}
/>


<input
    className="search-bar"
    type="text"
    placeholder="🔍 Search notes..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>

   <NoteList
  notes={filteredNotes}
  onDelete={handleDelete}
  onEdit={setEditingNote}
/>
    
    </div>
<Footer/>
    </>
  );
}

export default App;