import express from "express";
import {
    deleteATutCat,
    getATutCat,
    getAllTutCategories,
    postTutorialCategory,
    updateATutCat,
} from "../controllers/tutCatCtrl.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const tutCatRouter = express.Router();

tutCatRouter.post("/post", authMiddleware, isAdmin, postTutorialCategory);
tutCatRouter.get("/", getAllTutCategories);
tutCatRouter.get("/:id", authMiddleware, isAdmin, getATutCat);
tutCatRouter.put("/:id", authMiddleware, isAdmin, updateATutCat);
tutCatRouter.delete("/:id", authMiddleware, isAdmin, deleteATutCat);

export default tutCatRouter;
