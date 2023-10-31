import Project from "../models/projectModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./customCtrl.js";

export const postProject = createOne(Project);
export const deleteProject = deleteOne(Project);
export const updateProject = updateOne(Project);
export const getProject = getOne(Project);
export const getAllProject = getAll(Project);
