import mongoose from "mongoose";

const videoCatSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        required:true,
    }
},{timestamps:true});

const VideoCat = mongoose.model("VideoCat", videoCatSchema);

export default VideoCat