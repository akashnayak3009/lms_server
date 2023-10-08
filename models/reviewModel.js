import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    color:{
        type:String,
        required:true,
    },
    isApproved:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;