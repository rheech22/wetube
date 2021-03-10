import mongoose from "mongoose";

const CommentShema = new mongoose.Schema({
    text: {
        type: String,
        required: "Text is required",
    },
    createdAt: {
        type: Date,
        dafault: Date.now,
    },
});

const model = mongoose.model("Comment", CommentShema);
export default model;
