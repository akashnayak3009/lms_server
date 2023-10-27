import mongoose from "mongoose";
 
const workSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    profession:{
        type:String,
        required:true,
    },
    currentjob:{
        type:String,
        required:true,
    },
    resume:{
        type:String,
        required:true,
    }
},{timestamps:true})

const Work = mongoose.model("Work", workSchema);
export default Work;