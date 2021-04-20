import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: 'File URL is required',
    },
    title: {
        type: String,
        required: 'Title is required',
    },
    description: String,
    views: {
        type: Number,
        default: 0,
    },
    finalDiff: String,
    createdAt: {
        type: Date,
        dafault: Date.now,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    bookmarkUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

const model = mongoose.model('Video', VideoSchema);
export default model;
