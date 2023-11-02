import Question from "../../models/qna/quesModel.js";
import Answer from "../../models/qna/ansModel.js";
import Qna from "../../models/qna/qnaModel.js";
import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../../config/validateMongoDbId.js";
import slugify from "slugify";
import { getAll, getOne, updateOne } from "../customCtrl.js";
import Qnatag from "../../models/qna/tagModel.js";
import Qnacomment from "../../models/qna/qnacomment.js";

export const createPost = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    if (req.body.tag) {
      req.body.tags.forEach(async (element) => {
        const updateTagCount = await Qnatag.findByIdAndUpdate(
          element,
          {
            $inc: { totalques: totalques + 1 },
          },
          { new: true }
        );
      });
    }
    const newQues = await Question.create(req.body);
    const post = await Qna.create({
      user: id,
      question: newQues?._id,
      slug: req.body.slug,
    });
    return res
      .status(200)
      .json({ status: true, message: "Post  created successfully", post });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: " Creating Post failed" });
  }
});

export const createAnswer = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { postId } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const data = {
      user: id,
      ...req.body,
    };
    const answer = await Answer.create(data);
    const post = await Qna.findByIdAndUpdate(
      postId,
      {
        answer: answer?._id,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ status: true, message: "Post  created successfully", post });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: " Creating Post failed" });
  }
});

export const updateQuestion = updateOne(Question);

export const updateAnswer = updateOne(Answer);

export const getQuestion = getOne(Qna, "question answer");

export const getAllQuestion = getAll(Qna, "question answer");

export const deleteQuestion = asyncHandler(async (req, res) => {
  const { postId, quesId, ansId } = req.params;
  validateMongodbId(postId);
  validateMongodbId(quesId);
  if (ansId) validateMongodbId(ansId);
  try {
    const deletePost = await Qna.findByIdAndDelete(postId);
    const deleteQuestion = await Question.findByIdAndDelete(quesId);
    if (ansId) await Answer.findByIdAndDelete(ansId);
    return res
      .status(200)
      .json({ status: true, message: "Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Deleted unsuccessfully" });
  }
});

export const addComment = asyncHandler(async (req, res) => {
  const { quesId } = req.params;
  const { id } = req.user;
  validateMongodbId(id);
  validateMongodbId(quesId);
  try {
    const createComment = await Qnacomment.create({
      user: id,
      comment: req.body.comment,
    });
    const findQuestion = await Question.findByIdAndUpdate(
      quesId,
      { $push: { comments: createComment._id } },
      { new: true }
    );
    return res.status(200).json({ status: true, message: "Add comment" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Failed Add comment" });
  }
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { quesId, commentId } = req.params;
  const { id } = req.user;
  validateMongodbId(commentId);
  validateMongodbId(quesId);
  try {
    const deleteComment = await Qnacomment.findByIdAndDelete(commentId);
    const findQuestion = await Question.findByIdAndUpdate(
      quesId,
      { $pull: { comments: commentId } },
      { new: true }
    );
    return res.status(200).json({ status: true, message: "Comment Deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Failed Delete comment" });
  }
});
