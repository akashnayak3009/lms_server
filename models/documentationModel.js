import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            default: "Developer Corner",
        },
        content: {
            type: String,
            required: true,
        },
        keywords: {
            type: [],
            required: true,
        },
        doc_image: {
            type: String,
            default:
                "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg",
        },
    },
    { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);
export default Document;
