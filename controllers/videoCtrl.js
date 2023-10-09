import slugify from "slugify";
import { validateMongodbId } from "../config/validateMongoDbId.js";
import Video from "../models/videoModel.js";
import asyncHandler from "express-async-handler";

//@DESC Create a Video
//@METHOD  POST method
export const postVideo = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const video = await Video.create(req.body);
        res.status(200).json({
            status: true,
            message: "Video posted successfully",
            video,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//@DESC Get a Video
//@METHOD  GET method
export const getVideo = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    try {
        const video = await Video.findOne({ slug });
        res.status(200).json({
            status: true,
            message: "Video Found successfully",
            video,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//@DESC Get all Video
//@METHOD  GET method
export const getAllVideos = asyncHandler(async(req,res)=>{
    try {
        const video = await Video.find();
        res.status(200).json({
            status: true,
            message: " All Video Found successfully",
            video,
        });
    } catch (error) {
        throw new Error(error);
    }
})

//@DESC Delete Video
//@METHOD  DELETE method
export const deleteVideos = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const video = await Video.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "  Video Deleted successfully",
            video,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//@DESC Update a  Video
//@METHOD  PUT method
export const updateVideo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const video = await Video.findByIdAndUpdate(id, req.body,{new:true});
        res.status(200).json({
            status: true,
            message: "Video updated successfully",
            video,
        });
    } catch (error) {
        throw new Error(error);
    }
});


