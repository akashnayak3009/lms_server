// import express from "express";
// import passport from "passport";
// import { generateToken } from "../config/jwtToken.js";
// import User from "../models/userModel.js";
// import expressAsyncHandler from "express-async-handler";

// const googleRouter = express.Router();

// googleRouter.get(
//     "/login/success",
//     expressAsyncHandler(async (req, res) => {
//         console.log("success");
//         res.status(200).json({
//             status:true,
//             message:"Login Success"
//         })
//      })
// );

// googleRouter.get(
//     "/login/failed",
//     expressAsyncHandler(async (req, res) => {
//         res.status(401).json({
//             status:false,
//             message:"Login failed"
//         })
//      })
// );

// googleRouter.get(
//     "/google",
//     expressAsyncHandler(async (req, res) => {
//         await passport.authenticate("google", ["profile", "email"]);
//     })
// );

// googleRouter.get(
//     "/auth/google/callback",
//     expressAsyncHandler(async (req, res) => {
//         await passport.authenticate("google", {
//             successRedirect: "/login/success",
//             failureRedirect: "login/failed",
//         });
//     })
// );

// googleRouter.get(
//     "/logout",
//     expressAsyncHandler(async (req, res) => {
//         req.logout();
//         res.redirect("/");
//     })
// );

// export default googleRouter;
import express from "express";
import passport from "passport";
import { generateToken } from "../config/jwtToken.js";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const googleRouter = express.Router();

googleRouter.get(
    "/login/success",
    expressAsyncHandler(async (req, res) => {
       if(req.user){
        const findUser = await User.findOne({email:req.user.email});
        if(findUser){
            res.status(200).json({
                status: true,
                message: "Login successfully",
                token: generateToken(findUser?._id),
                role: findUser?.roles,
                username: findUser?.firstname + " " + findUser?.lastname,
                user_image: findUser?.user_image,
                from: 'google'
            })
        }
       }
       else{
        throw new Error(" Something went wrong")
       }
    })
);

googleRouter.get(
    "/login/failed",
    expressAsyncHandler(async (req, res) => {
        res.status(401).json({
            status: false,
            message: "Login failed",
        });
    })
);

// Initiate Google OAuth2 authentication
googleRouter.get(
    "/google",
    passport.authenticate("google", {scope :["profile", "email"]})
);

// Handle Google OAuth2 callback
googleRouter.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/login/success",
        failureRedirect: "/login/failed", // Use an absolute URL
    })
);

googleRouter.get(
    "/logout",
    expressAsyncHandler(async (req, res) => {
        req.logout();
        res.redirect("/");
    })
);

export default googleRouter;
