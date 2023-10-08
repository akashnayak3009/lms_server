import Review from "../models/reviewModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../config/validateMongoDbId.js";

//create a review
export const createReview = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        let data = {
            user: _id,
            comment: req.body.comment,
            color: req.body.color,
        };
        const review = await Review.create(data);
        res.status(200).json({
            status: true,
            message: "Review Added Successfully!",
            review,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//get all review
export const getAllReview = asyncHandler(async (req, res) => {
    try {
        const review = await Review.find().populate("user");
        res.status(200).json({
            status: true,
            message: "Review Fetched Successfully!",
            review,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//get a review
export const getAReview = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const review = await Review.findById(id).populate("user");
        res.status(200).json({
            status: true,
            message: "Review Fetched Successfully!",
            review,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//Delete a review
export const deleteAReview = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const review = await Review.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "Review Deleted Successfully!",
            review,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//Update a review status
export const updateReviewStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const review = await Review.findByIdAndUpdate(id,{ isApproved: req.body.isApproved },{new: true});
        res.status(200).json({
            status: true,
            message: "Review Updated Successfully!",
            review,
        });
    } catch (error) {
        throw new Error(error);
    }
});



