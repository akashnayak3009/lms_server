import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 3,
      max: 350,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      min: 3,
      max: 5000,
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default:
        "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg",
    },
    category: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    instructor:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,       
    },
    lessons: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Lesson",
      },
    ],
    totalHours: {
      type: String,
      deault:0,
    },
    enrolls: {
      type: String,
      default:0,
    },
    ratings: [
      {
        stars: Number,
        comment: String,
        postedBy: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "User",
        },
      },
    ],
    totalRatings: {
      type: Number,
      default:0,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
