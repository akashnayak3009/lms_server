import Work from "../models/workWithUsModel.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./customCtrl.js";

export const postDetails = createOne(Work);
export const updateDetails = updateOne(Work);
export const deleteDetails = deleteOne(Work);
export const getDetail = getOne(Work);
export const getAllDetail = getAll(Work);
