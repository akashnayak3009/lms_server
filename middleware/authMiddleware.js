import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// export const authMiddleware = asyncHandler(async (req, res, next) => {
//     let token;
//     if (req?.headers?.authorization?.startsWith("Bearer")) {
//         token = req.headers.authorization.split(" ")[1];
//         try {
//             if (token) {
//                 const decoded = jwt.verify(token, process.env.JWT_SECRET);
//                 const user = await User.findById(decoded?.id);
//                 req.user = user;
//                 next();
//             }
//         } catch (error) {
//             throw new Error("Not Authorized, please login again");
//         }
//     } else {
//         throw new Error("No Token Provided");
//     }
// });

export const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);
                if (user) {
                    req.user = user;
                    next();
                } else {
                    throw new Error("User not found");
                }
            }
        } catch (error) {
            throw new Error("Not Authorized, please login again");
        }
    } else {
        throw new Error("No Token Provided");
    }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const isAdmin = await User.findOne({ email })
    if (isAdmin.roles !== "admin") {
        throw new Error("You are not an admin")
    } else {
        next();
    }
});

export const isInstructor = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const isInstructor = await User.findOne({ email })
    if (isInstructor.roles !== "instructor") {
        throw new Error("You are not an Instructor")
    } else {
        next();
    }
});
