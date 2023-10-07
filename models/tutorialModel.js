import mongoose from "mongoose";

const tutorialSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique: true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    tutorialCategory:{
        type:String,
        required:true,
    },
    tutorialCategorySlug:{
        type:String,
        required:true,
    },
    topicName:{
        type:String,
        required:true,
        unique: true,
    },
    content:{
        type:String,
        required:true,
    },
    keywords:{
        type:[],
        required:true,
    }
 },{timestamp:true})

const Tutorial = mongoose.model('Tutorial', tutorialSchema);
export default Tutorial;

