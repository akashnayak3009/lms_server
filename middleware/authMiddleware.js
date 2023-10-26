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
          return res
            .status(500)
            .json({ status: false, message: "User Not Found" });
        }
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: "Not Authorised, Please Login Again" });
    }
  } else {
    return res
      .status(500)
      .json({ status: false, message: "No Token Provided" });
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  try {
    const isAdmin = await User.findOne({ email });
    if (!isAdmin) {
      return res
        .status(404)
        .json({ status: false, message: "Admin not found" });
    }
    if (isAdmin.roles !== "admin") {
      return res
        .status(500)
        .json({ status: false, message: "Your are Not Admin role" });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: "Server error" });
  }
});

export const isInstructor = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  try {
    const isInstructor = await User.findOne({ email });
    if (!isInstructor) {
      return res
        .status(404)
        .json({ status: false, message: "Instructor not found" });
    }
    if (isInstructor.roles !== "instructor") {
      return res
        .status(500)
        .json({ status: false, message: "Your are Not Instructor role" });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: "Server error" });
  }
});

export const isBoth = asyncHandler(async (req, res, next) => {
  const { email } = req.user;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (user.roles !== "admin" && user.roles !== "instructor") {
      return res.status(403).json({
        status: false,
        message: "You are neither an Admin nor an Instructor",
      });
    }

    next();
  } catch (err) {
    // Handle errors appropriately
    return res.status(500).json({ status: false, message: "Server error" });
  }
});

//  ISBOTH OR ISADMIN OR ISINSTRUCTOR

// export const restrictTo = (...roles) => {
//   return asyncHandler(async (req, res, next) => {
//     if (!roles.includes(req.user.roles)) {
//       return res
//         .status(403)
//         .json({ status: false, message: "You are not authorised" });
//     } else {
//       next();
//     }
//   });
// };


// USER CAN USE THIS

// restrictTo("admin", "user")

// contactRouter.get("/:id", authMiddleware, restrictTO("user", "admin"), getAContact); 