import mongoose from "mongoose";

// Declare the Schema of the Mongo model
let newsLetterSchema  = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },

},{
    timestamps:true
});


const NewsLetter= mongoose.model('NewsLetter', newsLetterSchema);
export default NewsLetter;