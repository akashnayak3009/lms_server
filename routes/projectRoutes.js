import express from 'express';
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import { deleteProject, getAllProject, getProject, postProject, updateProject } from '../controllers/projectCtrl.js';

const projectRouter = express.Router();

projectRouter.post("/", authMiddleware, isAdmin, postProject);
projectRouter.put("/:id", authMiddleware, isAdmin, updateProject);
projectRouter.delete("/:id", authMiddleware, isAdmin, deleteProject);
projectRouter.get("/:id", authMiddleware, isAdmin, getProject);
projectRouter.get("/", authMiddleware, isAdmin, getAllProject);


export default projectRouter;