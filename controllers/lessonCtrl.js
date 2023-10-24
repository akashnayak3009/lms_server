import Lesson from "../models/lessonModel.js";
import Course from "../models/courseModel.js";
import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../config/validateMongoDbId.js";
import slugify from "slugify";
// Create a Lesson
export const createLesson = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  validateMongodbId(courseId);
  try {
    const findCourse = await Course.findById(courseId);

    if (!findCourse) {
      return res.status(404).json({ message: "No course found with the ID" });
    }

    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const lesson = new Lesson(req.body);
    await lesson.save();

    findCourse.lessons.push(lesson._id);
    await findCourse.save();

    res.status(201).json({
      status: true,
      message: "Lesson added to the course",
      lesson,
      findCourse,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Creating Lesson unsuccessfully" });
  }
});

// Delete a Lesson
export const deleteLesson = asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.params;
  validateMongodbId(courseId);
  validateMongodbId(lessonId);
  try {
    const findLesson = await Lesson.findById(lessonId);
    const findCourse = await Course.findById(courseId);

    if (!findLesson || !findCourse) {
      return res
        .status(404)
        .json({ message: "Course ID or Lesson ID not found" });
    }

    findCourse.lessons.pull(findLesson._id);
    await findCourse.save();

    await Lesson.findByIdAndRemove(lessonId);

    res.status(200).json({
      status: true,
      message: "Lesson deleted from the course",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Deleting Lesson unsuccessfully" });
  }
});

//Get A lesson
export const getALesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  validateMongodbId(lessonId);
  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: " Lesson ID not found" });
    }
    return res
      .status(200)
      .json({ status: true, message: " Lesson ID found", lesson });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Fetching Lesson unsuccessfully" });
  }
});

//Get All lesson
export const getAllCourseLesson = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  validateMongodbId(courseId);
  try {
    const course = await Course.findById(courseId).select("lessons");
    if (!course) {
      return res.status(404).json({ message: " Course ID not found" });
    }

    const lessonIds = course.lessons.map((lesson) => lesson._id);
    res.status(200).json({
      status: true,
      message: "All Lesson ID found",
      lessonIds,
      course,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Fetching Lesson unsuccessfully" });
  }
});

//Update a lesson
export const updateLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  try {
    const findAndUpdateLesson = await Lesson.findByIdAndUpdate(
      lessonId,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Lesson updated",
      findAndUpdateLesson,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Updating lesson failed" });
  }
});
