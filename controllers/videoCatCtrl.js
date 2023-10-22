
import VideoCat from '../models/videoCatModel.js';
import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../config/validateMongoDbId.js";
import slugify from 'slugify';

//CREATE Video CATEGORY
export const postVideoCategory = asyncHandler(async (req, res) => {
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const postVideoCat = await VideoCat.create(req.body);
        res.status(200).json({
            status: true,
            message: "Video category Created Successfully",
            postVideoCat,
        });
    } catch (error) {
        return res.status(500).json({status:false, message:"Video category not created"});
    }
});

//GET ALL Video CATEGORY
export const getAllVideoCategories =asyncHandler(async(req,res)=>{
    try{
        const allvideocat = await VideoCat.find();
        res.status(200).json({
            status:true,
            message:"Video category fetch successfully",
            allvideocat
        })
    }catch(error){
        return res.status(500).json({status:false, message:"Video category fetched unsuccessfully"});
    }
})

//GET ONE Video CATEGORY
export const  getAVideoCat =asyncHandler(async(req,res)=>{
    const {id}= req.params;
    validateMongodbId(id);
    try{
        const findVideoCat=await VideoCat.findById(id)
        res.status(200).json({
            status:true,
            message:`Video category is found`,
            findVideoCat
        })
    }catch(error){
        return res.status(500).json({status:false, message:"Video category not get by id."});
    }
})

//DELETING Video CATEGORY
export const  deleteAVideoCat =asyncHandler(async(req,res)=>{
    const {id}= req.params;
    validateMongodbId(id);
    try{
        const deleteVideoCat=await VideoCat.findByIdAndDelete(id);
        res.status(200).json({
            status:true,
            message:`Video category is Deleted`,
        })
    }catch(error){
        return res.status(500).json({status:false, message:"Video category not deleted"});
    }
})

//UPDATE ONE Video CATEGORY
export const  updateAVideoCat =asyncHandler(async(req,res)=>{
    const {id}= req.params;
    validateMongodbId(id);
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title);
        }
        const upadateVideoCat=await VideoCat.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            status:true,
            message:`Video category is Updated `,
            upadateVideoCat
        })
    }catch(error){
        return res.status(500).json({status:false, message:"Video category not updated"});
    }
})