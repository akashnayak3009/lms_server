import mongoose from 'mongoose';

const courseCatSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    }
},{timestamps:true});

const CourseCat = mongoose.model("CourseCat",courseCatSchema);
export default CourseCat;

