import mongoose from "mongoose";

const contactSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    profession:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"submitted",
    }
},{
    timestamps:true,
})

const Contact  = mongoose.model("Contact", contactSchema);
export default Contact;