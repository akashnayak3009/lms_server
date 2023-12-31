import mongoose, { mongo } from "mongoose";

const bookSessionSchema = new mongoose.Schema({
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
    subject:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    timeslot:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"Requested"
    }
},{timestamps:true})


const BookSession = mongoose.model("Session",bookSessionSchema);
export default BookSession