import express from "express";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import {
  deleteCategory,
  getAllCategory,
  getCategory,
  postCategory,
  updateCategory,
} from "../controllers/projectCatCtrl.js";

const projectCatRouter = express.Router();

projectCatRouter.post("/", authMiddleware, isAdmin, postCategory);
projectCatRouter.put("/:id", authMiddleware, isAdmin, updateCategory);
projectCatRouter.delete("/:id", authMiddleware, isAdmin, deleteCategory);
projectCatRouter.get("/:id", authMiddleware, isAdmin, getCategory);
projectCatRouter.get("/", authMiddleware, isAdmin, getAllCategory);

export default projectCatRouter;
