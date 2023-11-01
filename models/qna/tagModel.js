import mongoose, { modelNames } from "mongoose";

const tagsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String, 
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    totalques:{
        type:Number,
        default:0,
    }
},{timestamps:true})


const Qnatag = mongoose.model("Qnatag", tagsSchema);
export default Qnatag;
