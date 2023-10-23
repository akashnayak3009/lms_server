import Course from "../models/courseModel.js";
import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../config/validateMongoDbId.js";
import slugify from "slugify";

//Create A course
export const createCourse = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    if (_id) {
      req.body.instructor = _id;
    }
    const course = await Course.create(req.body);
    res.status(200).json({
      status: true,
      message: "Created course Successfully",
      course,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Creating course unsuccessfully" });
  }
});

//Get  All course
export const getAllCourses = asyncHandler(async (req, res) => {
  try {
    const course = await Course.find();
    res.status(200).json({
      status: true,
      message: "All courses fetched Successfully",
      course,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Fetching all courses unsuccessfully" });
  }
});

//Get  A course
export const getACourse = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const course = await Course.findOne({ slug });
    res.status(200).json({
      status: true,
      message: "Course fetched Successfully",
      course,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Fetching  course unsuccessfully" });
  }
});

//Get particular instructor course
export const getParticularInstructorCourses= asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    validateMongodbId(_id);
    try{
        const course = await Course.find({instructor:_id});
        return res
        .status(200)
        .json({ status: true, message: "Fetched particular course Successfully", course });
    }catch(error){
        return res
        .status(500)
        .json({ status: false, message: "Get particular course unsuccessfully" });
    }
    }
)

//Update a course

export const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(_id);
  try {
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });

    return res
      .status(200)
      .json({ status: false, message: "Course updated Successfully", course });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Course updated Unsuccessfully" });
  }
});

//Delete a course

export const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(_id);
  try {
    const course = await Course.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ status: false, message: "Course Deleted Successfully", course });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Course Deleted Unsuccessfully" });
  }
});
