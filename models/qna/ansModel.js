import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    voteCount: {
      type: Number,
      default: 0,
    },
    upVotes: [
      {
        name: String,
        createdAt: String,
      },
    ],
    downVotes: [
      {
        name: String,
        createdAt: String,
      },
    ],
  },
  { timestamps: true }
);

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;
