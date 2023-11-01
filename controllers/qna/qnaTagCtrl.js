import Qnatag from "../../models/qna/tagModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../customCtrl.js";

export const postTag = createOne(Qnatag);
export const updateTag = updateOne(Qnatag);
export const deleteTag = deleteOne(Qnatag);
export const getTag = getOne(Qnatag);
export const getAllTag = getAll(Qnatag);
