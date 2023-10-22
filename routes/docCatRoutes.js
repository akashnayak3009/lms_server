import express from "express";

import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import {
  deleteADocCat,
  getADocCat,
  getAllDocCategories,
  postDocCategory,
  updateADocCat,
} from "../controllers/docCatCtrl.js";

const docCatRouter = express.Router();

docCatRouter.post("/post", authMiddleware, postDocCategory);
docCatRouter.get("/", getAllDocCategories);
docCatRouter.get("/:id", authMiddleware, getADocCat);
docCatRouter.put("/:id", authMiddleware, updateADocCat);
docCatRouter.delete("/:id", authMiddleware, isAdmin, deleteADocCat);

export default docCatRouter;
