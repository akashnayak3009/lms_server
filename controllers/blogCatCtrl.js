
import BlogCat from '../models/blogCatModel.js';
import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../config/validateMongoDbId.js";

//CREATE Blog CATEGORY
export const postBlogCategory = asyncHandler(async (req, res) => {
    try {
        const postBlogCat = await BlogCat.create(req.body);
        res.status(200).json({
            status: true,
            message: "Blog category Created Successfully",
            postBlogCat,
        });
    } catch (error) {
        return res.status(500).json({status:false, message:"Blog category not created"});
    }
});

//GET ALL Blog CATEGORY
export const getAllBlogCategories =asyncHandler(async(req,res)=>{
    try{
        const allblogcat = await BlogCat.find();
        res.status(200).json({
            status:true,
            message:"Blog category fetch successfully",
            allblogcat
        })
    }catch(error){
        return res.status(500).json({status:false, message:"Blog category fetched unsuccessfully"});
    }
})

//GET ONE Blog CATEGORY
export const  getABlogCat =asyncHandler(async(req,res)=>{
    const {id}= req.params;
    validateMongodbId(id);
    try{
        const findBlogCat=await BlogCat.findById(id)
        res.status(200).json({
            status:true,
            message:`Blog category is found`,
            findBlogCat
        })
    }catch(error){
        return res.status(500).json({status:false, message:"Blog category not get by id."});
    }
})

//DELETING Blog CATEGORY
export const  deleteABlogCat =asyncHandler(async(req,res)=>{
    const {id}= req.params;
    validateMongodbId(id);
    try{
        const deleteBlogCat=await BlogCat.findByIdAndDelete(id);
        res.status(200).json({
            status:true,
            message:`Blog category is Deleted`,
        })
    }catch(error){
        return res.status(500).json({status:false, message:"Blog category not deleted"});
    }
})

//UPDATE ONE Blog CATEGORY
export const  updateABlogCat =asyncHandler(async(req,res)=>{
    const {id}= req.params;
    validateMongodbId(id);
    try{
        const upadateBlogCat=await BlogCat.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            status:true,
            message:`Blog category is Updated `,
            upadateBlogCat
        })
    }catch(error){
        return res.status(500).json({status:false, message:"Blog category not updated"});
    }
})