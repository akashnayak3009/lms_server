import slugify from "slugify";
import { validateMongodbId } from "../config/validateMongoDbId.js";
import Blog from "../models/blogModel.js";
import asyncHandler from "express-async-handler";

//@DESC Create a Blog
//@METHOD  POST method
export const postBlog = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const blog = await Blog.create(req.body);
        res.status(200).json({
            status: true,
            message: "Blog posted successfully",
            blog,
        });
    } catch (error) {
        return res.status(500).json({message:"Blog post unsuccessfully"})
    }
});

//@DESC Get a Blog
//@METHOD  GET method
export const getBlog = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    try {
        const blog = await Blog.findOne({ slug });
        res.status(200).json({
            status: true,
            message: "Blog Found successfully",
            blog,
        });
    } catch (error) {
        return res.status(500).json({message:"Blog found unsuccessfully"})
    }
});

//@DESC Get all Blog
//@METHOD  GET method
export const getAllBlogs = asyncHandler(async(req,res)=>{
    try {
        const blog = await Blog.find();
        res.status(200).json({
            status: true,
            message: " All Blog Found successfully",
            blog,
        });
    } catch (error) {
        return res.status(500).json({message:"Blog found unsuccessfully"})
    }
})

//@DESC Delete Blog
//@METHOD  DELETE method
export const deleteBlogs = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const blog = await Blog.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "  Blog Deleted successfully",
            blog,
        });
    } catch (error) {
        return res.status(500).json({message:"Blog Deleted unsuccessfully"})
    }
});

//@DESC Update a  Blog
//@METHOD  PUT method
export const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const blog = await Blog.findByIdAndUpdate(id, req.body,{new:true});
        res.status(200).json({
            status: true,
            message: "Blog updated successfully",
            blog,
        });
    } catch (error) {
        return res.status(500).json({message:"Blog Updated unsuccessfully"})
    }
});


