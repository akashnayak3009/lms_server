import express from "express";
import {
  createAnswer,
  createPost,
  deleteQuestion,
  getAllQuestion,
  getQuestion,
  updateAnswer,
  updateQuestion,
} from "../controllers/qna/qnaCtrl.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const qnaRouter = express.Router();

qnaRouter.post("/post", authMiddleware, createPost);
qnaRouter.post("/post/answer/:postId", authMiddleware, createAnswer);

qnaRouter.put("/post/:id", authMiddleware, updateQuestion);
qnaRouter.put("/post/answer/:id", authMiddleware, updateAnswer);

qnaRouter.get("/post/:slug", authMiddleware, getQuestion);
qnaRouter.get("/post", authMiddleware, getAllQuestion);

qnaRouter.delete(
  "/post/:postId/:quesId/:ansId?",
  authMiddleware,
  deleteQuestion
);

export default qnaRouter;
