import { generateToken } from "../config/jwtToken.js";
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
            username: findUser?.firstname + " " +findUser?.lastname,
            user_image: findUser?.user_image,
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});
