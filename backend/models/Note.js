import mongoose from "mongoose";

const noteSchema=mongoose.Schema({
    title:{type:String,required:true,trim:true},
    content:{type:String,required:true,trim:true},
    created:{type:Date,default:Date.now}
})
const Note=mongoose.model("Note",noteSchema)
export default Note