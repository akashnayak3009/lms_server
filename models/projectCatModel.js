import mongoose, { mongo } from 'mongoose';
const projectCatSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
    },
},{timestamps:true});

const ProjectCategory = mongoose.model("ProjectCategory", projectCatSchema);
export default ProjectCategory