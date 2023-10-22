

import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../config/validateMongoDbId.js";
import CourseCat from "../models/courseCategoryModel.js";

//CREATE Course CATEGORY
export const postCourseCategory = asyncHandler(async (req, res) => {
    try {
        const postCourseCat = await CourseCat.create(req.body);
        res.status(200).json({
            status: true,
            message: "Course category Created Successfully",
            postCourseCat,
        });
    } catch (error) {
        return res.status(500).json({status:false, message:"Course category not created"});
    }
});

//GET ALL Course CATEGORY
export const getAllCourseCategories =asyncHandler(async(req,res)=>{
    try{
        const allcoursecat = await CourseCat.find();
        res.status(200).json({
            status:true,
            message:"Course category fetch successfully",
            allcoursecat
        })
    }catch(error){
        return res.status(500).json({status:false, message:"Course category fetched unsuccessfully"});
    }
})

//GET ONE Course CATEGORY
export const  getACourseCat =asyncHandler(async(req,res)=>{
    const {id}= req.params;
    validateMongodbId(id);
    try{
        const findCourseCat=await CourseCat.findById(id)
        res.status(200).json({
            status:true,
            message:`Course category is found`,
            findCourseCat
        })
    }catch(error){
        return res.status(500).json({status:false, message:"Course category not get by id."});
    }
})

//DELETING Course CATEGORY
export const  deleteACourseCat =asyncHandler(async(req,res)=>{
    const {id}= req.params;
    validateMongodbId(id);
    try{
        const deleteCourseCat=await CourseCat.findByIdAndDelete(id);
        res.status(200).json({
            status:true,
            message:`Course category is Deleted`,
        })
    }catch(error){
        return res.status(500).json({status:false, message:"Course category not deleted"});
    }
})

//UPDATE ONE Course CATEGORY
export const  updateACourseCat =asyncHandler(async(req,res)=>{
    const {id}= req.params;
    validateMongodbId(id);
    try{
        const upadateCourseCat=await CourseCat.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            status:true,
            message:`Course category is Updated `,
            upadateCourseCat
        })
    }catch(error){
        return res.status(500).json({status:false, message:"Course category not updated"});
    }
})