import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    instagram: { type: String, required: false },
    twitter: { type: String, required: false},
    facebook: { type: String, required: false },
    comment: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});
const Comment = mongoose.models.comments || mongoose.model("comments", commentSchema);
export default Comment;