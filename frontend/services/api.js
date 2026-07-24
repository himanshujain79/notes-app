import axios from "axios"
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
export const getNotes = () => API.get("/notes");
export const createNote = (note) => API.post("/notes", note);
export const deleteNote = (id) => API.delete(`/notes/${id}`);
export const updateNote = (id, note) => API.put(`/notes/${id}`, note);
export default API;