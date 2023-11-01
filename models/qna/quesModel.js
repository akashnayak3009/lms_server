import mongoose from "mongoose";

const questionSchema = new monogoose.Schema({
    title:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    tags:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    },
    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
    },
    voteCount:{
        type:Number,
        default:0,
    },
    upVotes:[{
        name:String,
        createdAt:String,
    },],
    downVotes:[{
        name:String,
        createdAt:String,
    },]
},{timestamps:true})

const Question = mongoose.model("Question",questionSchema);
export default Question;