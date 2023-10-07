import express from "express";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import {
    deleteTutorial,
    getATutorial,
    getAllTutorial,
    postTutorial,
    updateTutorial,
} from "../controllers/tutorialCtrl.js";

const tutorialRouter = express.Router();

tutorialRouter.post("/", authMiddleware, isAdmin, postTutorial);
tutorialRouter.get("/:type/:slug", getATutorial);
tutorialRouter.get("/",authMiddleware,isAdmin, getAllTutorial);
tutorialRouter.put("/:id", authMiddleware, isAdmin, updateTutorial);
tutorialRouter.delete("/:id", authMiddleware, isAdmin, deleteTutorial);

export default tutorialRouter;
