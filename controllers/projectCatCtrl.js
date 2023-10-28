import ProjectCategory from "../models/projectCatModel.js";
import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../config/validateMongoDbId.js";
import slugify from "slugify";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./customCtrl.js";

export const postCategory = createOne(ProjectCategory);
export const updateCategory = updateOne(ProjectCategory);
export const deleteCategory = deleteOne(ProjectCategory);
export const getCategory = getOne(ProjectCategory);
export const getAllCategory = getAll(ProjectCategory);
