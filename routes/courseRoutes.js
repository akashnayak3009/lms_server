import express from "express";
import { authMiddleware, isBoth } from "../middleware/authMiddleware.js";
import {
  createCourse,
  deleteCourse,
  getACourse,
  getAllCourses,
  getParticularInstructorCourses,
  updateCourse,
} from "../controllers/courseCtrl.js";

const courseRouter = express.Router();

courseRouter.post("/", authMiddleware, isBoth, createCourse);
courseRouter.get("/all", getAllCourses);
courseRouter.get("/:slug", getACourse);
courseRouter.delete("/:id", authMiddleware, isBoth, deleteCourse);
courseRouter.put("/:id", authMiddleware, isBoth, updateCourse);
courseRouter.get(
  "/instructor/all-courses",
  authMiddleware,
  isBoth,
  getParticularInstructorCourses
);

export default courseRouter;
