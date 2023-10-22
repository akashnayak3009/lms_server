import slugify from "slugify";
import DocCat from "../models/docCatModel.js";
import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../config/validateMongoDbId.js";

//CREATE DOC CATEGORY
export const postDocCategory = asyncHandler(async (req, res) => {
    try {
        const postDocCat = await DocCat.create(req.body);
        res.status(200).json({
            status: true,
            message: "Doc category Created Successfully",
            postDocCat,
        });
    } catch (error) {
        return res.status(500).json({status:false, message:"Doc category not created"});
    }
});

//GET ALL DOC CATEGORY
export const getAllDocCategories =asyncHandler(async(req,res)=>{
    try{
        const alldoccat = await DocCat.find();
        res.status(200).json({
            status:true,
            message:"Doc category fetch successfully",
            alldoccat
        })
    }catch(error){
        return res.status(500).json({status:false, message:"Doc category fetched unsuccessfully"});
    }
})

//GET ONE DOC CATEGORY
export const  getADocCat =asyncHandler(async(req,res)=>{
    const {id}= req.params;
    validateMongodbId(id);
    try{
        const findDocCat=await DocCat.findById(id)
        res.status(200).json({
            status:true,
            message:`Doc category is found`,
            findDocCat
        })
    }catch(error){
        return res.status(500).json({status:false, message:"Doc category not get by id."});
    }
})

//DELETING DOC CATEGORY
export const  deleteADocCat =asyncHandler(async(req,res)=>{
    const {id}= req.params;
    validateMongodbId(id);
    try{
        const deleteDocCat=await DocCat.findByIdAndDelete(id);
        res.status(200).json({
            status:true,
            message:`Doc category is Deleted`,
        })
    }catch(error){
        return res.status(500).json({status:false, message:"Doc category not deleted"});
    }
})

//UPDATE ONE DOC CATEGORY
export const  updateADocCat =asyncHandler(async(req,res)=>{
    const {id}= req.params;
    validateMongodbId(id);
    try{
        const upadateDocCat=await DocCat.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            status:true,
            message:`Doc category is Updated `,
            upadateDocCat
        })
    }catch(error){
        return res.status(500).json({status:false, message:"Doc category not updated"});
    }
})