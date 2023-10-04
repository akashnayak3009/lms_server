import { generateToken } from "../config/jwtToken.js";
import { validateMongodbId } from "../config/validateMongoDbId.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// Create a User

export const registerUser = asyncHandler(async (req, res) => {
    // Get the email from req.body and find the whether a user with this email is exists or not.
    const email = req.body.email;
    //Find the user with this email get from req.body
    const findUser = await User.findOne({ email });
    if (!findUser) {
        // create a user
        const createUser = await User.create(req.body);
        res.status(200).json({
            status: true,
            message: "User Created Successfully",
            createUser,
        });
    } else {
        throw new Error("User Already exists");
    }
});

//Login User

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Check user Exists.

    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        res.status(200).json({
            status: true,
            message: "Login successfully",
            token: generateToken(findUser?._id),
            role: findUser?.roles,
            username: findUser?.firstname + " " + findUser?.lastname,
            user_image: findUser?.user_image,
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});

//Get all user

export const getAllUser = asyncHandler(async (req, res) => {
    try {
        const allUser = await User.find();
        res.status(201).json({
            status: true,
            message: "All users Fetched successfully",
            allUser,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//Get A user

export const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const getProfile = await User.findById(id);
        res.status(201).json({
            status: true,
            message: "User found successfully",
            getProfile,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//Update a user profile

export const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
        res
            .status(200)
            .json({ status: true, message: "User data is Updated", user });
    } catch (error) {
        throw new Error(error);
    }
});

//Delete a user

export const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        await User.findByIdAndDelete(_id);
        res
            .status(200)
            .json({ status: true, message: "User Deleted Successfully" });
    } catch (error) {
        throw new Error(error);
    }
});

//Block a user

export const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        await User.findByIdAndUpdate(id, { isblocked: true }, { new: true });
        res
            .status(200)
            .json({ status: true, message: "User Blocked successfully" });
    } catch (error) {
        throw new Error(error);
    }
});

//Unblock a user

export const unBlockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        await User.findByIdAndUpdate(id, { isblocked: false }, { new: true });
        res
            .status(200)
            .json({ status: true, message: "User UnBlocked successfully" });
    } catch (error) {
        throw new Error(error);
    }
});

//Update a password

export const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongodbId(_id);
    try {
        const user = await User.findById(_id);
        if (await user.isPasswordMatched(password)) {
            throw new Error("Please provide  new password instead of old one");
        } else {
            user.password = password;
            await user.save();
            res
                .status(200)
                .json({ status: true, message: "Password updated successfully" });
        }
    } catch (error) {
        throw new Error(error);
    }
});
