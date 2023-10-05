import express from "express";
import {
    blockUser,
    deleteUser,
    forgotPasswordToken,
    getAllUser,
    getUser,
    loginUser,
    registerUser,
    resetPassword,
    unBlockUser,
    updatePassword,
    updateUser,
} from "../controllers/userCtrl.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

//All post Routes

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPasswordToken);

//All get Routes

userRouter.get("/all-users", authMiddleware, isAdmin, getAllUser);
userRouter.get("/:id", authMiddleware, getUser);

//All PUT routes

userRouter.put("/update-profile", authMiddleware, updateUser);
userRouter.put("/block/:id", authMiddleware, isAdmin, blockUser);
userRouter.put("/unblock/:id", authMiddleware, isAdmin, unBlockUser);
userRouter.put("/update-password", authMiddleware, updatePassword);
userRouter.put("/reset-password/:token", resetPassword);

//ALl Delete Routes

userRouter.delete("/:id", authMiddleware, isAdmin, deleteUser);

export default userRouter;
