import express from "express";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import {
  createReview,
  deleteAReview,
  getAReview,
  getAllReview,
  updateReviewStatus,
} from "../controllers/reviewCtrl.js";

const reviewRouter = express.Router();

reviewRouter.post("/", authMiddleware, createReview);
reviewRouter.get("/:id", authMiddleware, isAdmin, getAReview);
reviewRouter.get("/", getAllReview);
reviewRouter.delete("/:id", authMiddleware, isAdmin, deleteAReview);
reviewRouter.put('/:id', authMiddleware, isAdmin, updateReviewStatus)

export default reviewRouter;
