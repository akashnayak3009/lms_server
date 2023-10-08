import slugify from "slugify";
import Tutorial from "../models/tutorialModel.js";
import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../config/validateMongoDbId.js";

//POST TUTORIAL
export const postTutorial = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        if (req.body.tutorialCategory) {
            req.body.tutorialCategorySlug = slugify(req.body.tutorialCategory);
        }
        const tutorial = await Tutorial.create(req.body);
        res.status(200).json({
            status: true,
            message: "Tutorial Created Successfully",
            tutorial,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//GET  TUTORIAL
export const getATutorial = asyncHandler(async (req, res) => {
    try {
        const { slug, type } = req.params;
        const getTutData = await Tutorial.findOne({
            slug,
            tutorialCategorySlug: type,
        });
        const tutorialTopics = await Tutorial.find({ tutorialCategorySlug: type })
            .select("topicName title slug tutorialCategorySlug")
            .sort("createdAt");
        res.status(200).json({
            status: true,
            message: "Data Fetched",
            getTutData,
            tutorialTopics,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//UPDATE TUTORIAL
export const updateTutorial = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        if (req.body.tutorialCategory) {
            req.body.tutorialCategorySlug = slugify(req.body.tutorialCategory);
        }
        const updateTutorial = await Tutorial.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json({
            status: true,
            message: "Tutorial Updated Successfully",
        });
    } catch (error) {
        throw new Error(error);
    }
});

//DELETE TUTORIAL
export const deleteTutorial =asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongodbId(id);
    try{
        const deleteTut = await Tutorial.findByIdAndDelete(id);
        res.status(200).json({
            status:true,
            message:"Tutorial Deleted"
        })
    }catch(error){
        throw new Error(error);
    }
})

//GET ALL TUTORIAL
export const getAllTutorial =asyncHandler(async(req,res)=>{
    try{
        const getAllTut = await Tutorial.find();
        res.status(200).json({
            status:true,
            message:"Tutorial fetched successfully",
            getAllTut
        })
    }catch(error){
        throw new Error(error);
    }
})

