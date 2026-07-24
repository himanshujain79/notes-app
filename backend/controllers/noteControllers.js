import Note from "../models/Note.js"

export const getAllNotes= async (req,res)=>{
   try{
    const notes = await Note.find()
    res.json(notes)
   }
   catch(error){
    res.status(500).json({
        message : error.message,
   });
   }
}
export const createNote=async (req,res)=>{

    try{
          const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
  return res.status(400).json({
    message: "Title and content are required",
  });
}
   const note = await Note.create({
      title: title.trim(),
      content: content.trim(),
    });

     res.status(201).json(note);

    }

    catch(error){
        res.status(500).json({
            message : error.message,
        })
    }
}

export const updateNote= async (req,res)=>{
    try{
        const updatedNote=await Note.findByIdAndUpdate(
            req.params.id,
            {
                title:req.body.title,
                content:req.body.content,
            },
            {
                new :true
            }

        )
        res.json(updatedNote);
    }
    catch(error){
        res.status(500).json({
            message:error.message,
        })
    }
}

export const deleteNote=async (req,res)=>{
    try{
        const deletedNote=await Note.findByIdAndDelete(req.params.id)
    
      res.json({
      message: "Note deleted successfully",deletedNote,
    })
    }
    catch(error){
        res.status(500).json(
            {
                message:error.message
            }
        )
    }
}
