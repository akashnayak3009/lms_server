import mongoose from "mongoose";

const qnacommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Qnacomment = mongoose.model("Qnacomment", qnacommentSchema);
export default Qnacomment;
