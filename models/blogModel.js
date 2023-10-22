import mongoose from "mongoose";

let blogSchema = new mongoose.Schema({
title:{
    type:String,
    required:true,
},
slug:{
    type:String,
    required:true,
},
category:{
    type:String,
    required:true,
},
thumbnail:{
    type:String,
    default:"https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
},
description:{
    type:String,
    required:true,
},
keywords:{
    type:[],
    required:true,
},
},{timestamps:true})

const  Blog = mongoose.model("Blog", blogSchema);
export default Blog;