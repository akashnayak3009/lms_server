import slugify from "slugify";
import TutotrialCategory from "../models/tutCategory.js";
import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../config/validateMongoDbId.js";

//CREATE TUTORIAL CATEGORY
export const postTutorialCategory = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const postTutCat = await TutotrialCategory.create(req.body);
        res.status(200).json({
            status: true,
            message: "Tutorial category Created Successfully",
        });
    } catch (error) {
        throw new Error(error);
    }
});

//GET ALL TUTORIAL CATEGORY
export const getAllTutCategories =asyncHandler(async(req,res)=>{
    try{
        const alltutcat = await TutotrialCategory.find();
        res.status(200).json({
            status:true,
            message:"Tutorial category fetch successfully",
            alltutcat
        })
    }catch(error){
        throw new Error(error);
    }
})

//GET ONE TUTORIAL CATEGORY
export const  getATutCat =asyncHandler(async(req,res)=>{
    const {id}= req.params;
    validateMongodbId(id);
    try{
        const findTutCat=await TutotrialCategory.findById(id)
        res.status(200).json({
            status:true,
            message:`Tutorial category is found`,
            findTutCat
        })
    }catch(error){
        throw new Error(error)
    }
})

//DELETING TUTORIAL CATEGORY
export const  deleteATutCat =asyncHandler(async(req,res)=>{
    const {id}= req.params;
    validateMongodbId(id);
    try{
        const deleteTutCat=await TutotrialCategory.findByIdAndDelete(id);
        res.status(200).json({
            status:true,
            message:`Tutorial category is Deleted`,
        })
    }catch(error){
        throw new Error(error)
    }
})

//UPDATE ONE TUTORIAL CATEGORY
export const  updateATutCat =asyncHandler(async(req,res)=>{
    const {id}= req.params;
    validateMongodbId(id);
    try{
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const upadateTutCat=await TutotrialCategory.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            status:true,
            message:`Tutorial category is Updated `,
            upadateTutCat
        })
    }catch(error){
        throw new Error(error)
    }
})