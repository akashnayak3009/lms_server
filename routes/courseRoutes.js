import express from "express";
import { authMiddleware, isBoth } from "../middleware/authMiddleware.js";
import {
  checkEnrollment,
  createCourse,
  deleteCourse,
  freeEnrollment,
  getACourse,
  getAllCourses,
  getParticularInstructorCourses,
  updateCourse,
} from "../controllers/courseCtrl.js";
import {
  createLesson,
  deleteLesson,
  getALesson,
  getAllCourseLesson,
  updateLesson,
} from "../controllers/lessonCtrl.js";

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

/*====================Lesson===============*/

courseRouter.post("/lesson/:courseId", authMiddleware, isBoth, createLesson);
courseRouter.put(
  "/lesson/:courseId/:lessonId",
  authMiddleware,
  isBoth,
  deleteLesson
);
courseRouter.get("/lesson/:lessonId", authMiddleware, isBoth, getALesson);
courseRouter.get(
  "/lesson/all/:courseId",
  authMiddleware,
  isBoth,
  getAllCourseLesson
);
courseRouter.put("/lesson/:lessonId", authMiddleware, isBoth, updateLesson);

//---------Enrollement-----------//
courseRouter.post('/check-enrollment/:courseId', authMiddleware,checkEnrollment)
courseRouter.post('/free-enrollment/:courseId', authMiddleware,freeEnrollment)

export default courseRouter;
