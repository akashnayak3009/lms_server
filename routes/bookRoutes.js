import express from "express";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import {
  deleteBookSession,
  getBookSession,
  postBookSession,
  updateBookSession,
} from "../controllers/bookSessionCtrl.js";

const bookRouter = express.Router();

bookRouter.post("/", authMiddleware, isAdmin, postBookSession);
bookRouter.put("/:id", authMiddleware, isAdmin, updateBookSession);
bookRouter.delete("/:id", authMiddleware, isAdmin, deleteBookSession);
bookRouter.get("/:id", authMiddleware, isAdmin, getBookSession);

export default bookRouter;
