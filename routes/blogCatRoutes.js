import express from "express";

import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import {
  deleteABlogCat,
  getABlogCat,
  getAllBlogCategories,
  postBlogCategory,
  updateABlogCat,
} from "../controllers/blogCatCtrl.js";

const blogCatRouter = express.Router();

blogCatRouter.post("/post", authMiddleware, postBlogCategory);
blogCatRouter.get("/", getAllBlogCategories);
blogCatRouter.get("/:id", authMiddleware, getABlogCat);
blogCatRouter.put("/:id", authMiddleware, updateABlogCat);
blogCatRouter.delete("/:id", authMiddleware, isAdmin, deleteABlogCat);

export default blogCatRouter;
