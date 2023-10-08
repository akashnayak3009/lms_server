import NewsLetter from "../models/newsLetterModel.js";
import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../config/validateMongoDbId.js";

// POST EMAIL
export const subscribe = asyncHandler(async (req, res) => {
    try {
        const newEmail = await NewsLetter.create(req.body);
        res.status(200).json({ status: true, message: "Subscribed to NewLetter", newEmail });
    } catch (error) {
        throw new Error(error);
    }
});

export const unSubscribe = asyncHandler(async (req, res) => {
    const { id } =req.params;
    validateMongodbId(id);
    try {
        const deleteEmail = await NewsLetter.findByIdAndDelete(id);
        res.status(200).json({ status: true, message: "UnSubscribed to NewLetter" });
    } catch (error) {
        throw new Error(error);
    }
});
