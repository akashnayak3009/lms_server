import slugify from "slugify";
import { validateMongodbId } from "../config/validateMongoDbId.js";
import Document from "../models/documentationModel.js";
import asyncHandler from "express-async-handler";

//@DESC Create a Document
//@METHOD  POST method
export const postDocument = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const docs = await Document.create(req.body);
        res.status(200).json({
            status: true,
            message: "Document posted successfully",
            docs,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//@DESC Get a Document
//@METHOD  GET method
export const getDocument = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    try {
        const docs = await Document.findOne({ slug });
        res.status(200).json({
            status: true,
            message: "Document Found successfully",
            docs,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//@DESC Get all Document
//@METHOD  GET method
export const getAllDocuments = asyncHandler(async(req,res)=>{
    try {
        const docs = await Document.find();
        res.status(200).json({
            status: true,
            message: " All Document Found successfully",
            docs,
        });
    } catch (error) {
        throw new Error(error);
    }
})

//@DESC Delete Document
//@METHOD  DELETE method
export const deleteDocuments = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const docs = await Document.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "  Document Deleted successfully",
            docs,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//@DESC Update a  Document
//@METHOD  PUT method
export const updateDocument = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const docs = await Document.findByIdAndUpdate(id, req.body,{new:true});
        res.status(200).json({
            status: true,
            message: "Document updated successfully",
            docs,
        });
    } catch (error) {
        throw new Error(error);
    }
});


