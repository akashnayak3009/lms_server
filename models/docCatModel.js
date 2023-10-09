import mongoose from "mongoose";

const docCatSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
},{timestamps:true});

const DocCat = mongoose.model("DocCat", docCatSchema);

export default DocCat