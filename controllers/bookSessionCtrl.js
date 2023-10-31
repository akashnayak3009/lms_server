import BookSession from "../models/sessionModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./customCtrl.js";

export const postBookSession = createOne(BookSession);
export const deleteBookSession = deleteOne(BookSession);
export const updateBookSession = updateOne(BookSession);
export const getBookSession = getOne(BookSession);