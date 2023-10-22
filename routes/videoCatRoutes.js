
import express from "express";

import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import {
  deleteAVideoCat,
  getAVideoCat,
  getAllVideoCategories,
  postVideoCategory,
  updateAVideoCat,
} from "../controllers/videoCatCtrl.js";

const videoCatRouter = express.Router();

videoCatRouter.post("/post", authMiddleware, postVideoCategory);
videoCatRouter.get("/", getAllVideoCategories);
videoCatRouter.get("/:id", authMiddleware, getAVideoCat);
videoCatRouter.put("/:id", authMiddleware, updateAVideoCat);
videoCatRouter.delete("/:id", authMiddleware, isAdmin, deleteAVideoCat);

export default videoCatRouter;
