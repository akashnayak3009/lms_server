import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:350,
        trim:true,
    },
    slug:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        min:200
    },
    vide0:{
        type:String,

    },
    free_preview:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

const Lesson = mongoose.model("Lesson", lessonSchema);
export default Lesson;