import Contact from "../models/contactModel.js";
import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../config/validateMongoDbId.js";

//create a contact
export const createContact = asyncHandler(async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(200).json({
            status: true,
            message: "Enquiry Form submitted Successfully!",
            contact,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//get all contact
export const getAllContact = asyncHandler(async (req, res) => {
    try {
        const contact = await Contact.find();
        res.status(200).json({
            status: true,
            message: "Enquiry Fetched Successfully!",
            contact,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//get a contact
export const getAContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const contact = await Contact.findById(id);
        res.status(200).json({
            status: true,
            message: "Enquiry Fetched Successfully!",
            contact,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//Delete a contact
export const deleteAContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const contact = await Contact.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "Enquiry Deleted Successfully!",
            contact,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//Update a contact status
export const updateContactStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const contact = await Contact.findByIdAndUpdate(
            id,
            { status: req.body.status },
            { new: true }
        );
        res.status(200).json({
            status: true,
            message: "Enquiry Updated Successfully!",
            contact,
        });
    } catch (error) {
        throw new Error(error);
    }
});
