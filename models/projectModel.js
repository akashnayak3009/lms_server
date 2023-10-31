import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category:{
        type:String,
        required:true,
    },
    desc: {
      type: String,
      required: true,
    },
    links: [
      {
        name: String,
        url: String,
      },
    ],
    images: [],
    author: {
      type: String,
      default: "Developer's Corner",
    },
    price: {
      type: Number,
      default: 0,
    },
    priceAfterDiscount:{
        type:Number,
        default:0 ,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    techStack: [],
    keywords: [],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
