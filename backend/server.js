import express from "express";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import noteRoutes from "./routes/noteRoutes.js"
import cors from 'cors'

dotenv.config()

const app = express();
app.use(cors())
app.use(express.json());

const notes = [
  {
    id: 1,
    title: "Learn Express",
    content: "Complete Express basics today"
  },
  {
    id: 2,
    title: "Learn MongoDB atlas",
    content: "Connect database tomorrow"
  },
    {
    id: 3,
    title: "Learn React",
    content: "Complete react today"
  }
];

app.get("/", (req, res) => {
  res.send("Welcome to MERN Notes App");
});

app.use("/api/notes", noteRoutes);

app.post("/notes", (req, res) => {
  const newNote = {
    id: notes.length + 1,
    title: req.body.title,
    content: req.body.content,
  };

  notes.push(newNote);

  res.status(201).json({
    message: "Note added successfully",
    note: newNote,
  });
});

mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("MongoDB Connected")
}).catch((err)=>{
  console.log("Connection error: ",err)
})

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
