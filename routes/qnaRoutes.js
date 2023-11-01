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
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import {
  deleteTag,
  getAllTag,
  getTag,
  postTag,
  updateTag,
} from "../controllers/qna/qnaTagCtrl.js";

const qnaRouter = express.Router();

qnaRouter.post("/post", authMiddleware, createPost);
qnaRouter.post("/post/answer/:postId", authMiddleware, createAnswer);
qnaRouter.post("/tag", authMiddleware, isAdmin, postTag);

qnaRouter.put("/post/:id", authMiddleware, updateQuestion);
qnaRouter.put("/tag/:id", authMiddleware, isAdmin, updateTag);
qnaRouter.put("/post/answer/:id", authMiddleware, updateAnswer);

qnaRouter.get("/post/:slug", authMiddleware, getQuestion);
qnaRouter.get("/tag/:id", authMiddleware,isAdmin, getTag)
qnaRouter.get("/post", authMiddleware, getAllQuestion);
qnaRouter.get("/get", authMiddleware,isAdmin, getAllTag);

qnaRouter.delete(
  "/post/:postId/:quesId/:ansId?",
  authMiddleware,
  deleteQuestion
);
qnaRouter.delete("/tag/:id", authMiddleware, isAdmin, deleteTag);

export default qnaRouter;
