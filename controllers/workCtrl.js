import Work from "../models/workWithUsModel.js";
import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../config/validateMongoDbId.js";
import { createOne, deleteOne, getOne, updateOne } from "./customCtrl.js";

export const postDetails = createOne(Work);
export const updateDetails = updateOne(Work);
export const deleteDetails = deleteOne(Work);
export const getDetail = getOne(Work);
