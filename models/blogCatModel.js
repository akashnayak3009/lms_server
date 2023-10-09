import mongoose from "mongoose";

const blogCatSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
},{timestamps:true});

const BlogCat = mongoose.model("BlogCat", blogCatSchema);

export default BlogCat