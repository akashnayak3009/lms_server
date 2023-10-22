import express from "express";

import { authMiddleware, isAdmin, isBoth } from "../middleware/authMiddleware.js";
import {
  deleteACourseCat,
  getACourseCat,
  getAllCourseCategories,
  postCourseCategory,
  updateACourseCat,
} from "../controllers/courseCatCtrl.js";

const courseCatRouter = express.Router();

courseCatRouter.post("/post", authMiddleware, isBoth, postCourseCategory);
courseCatRouter.get("/", getAllCourseCategories);
courseCatRouter.get("/:id", authMiddleware,isBoth, getACourseCat);
courseCatRouter.put("/:id", authMiddleware,isBoth, updateACourseCat);
courseCatRouter.delete("/:id", authMiddleware, isBoth, deleteACourseCat);

export default courseCatRouter;
