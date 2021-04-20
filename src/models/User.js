import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    faceboodkId: Number,
    githubId: Number,
    kakaoId: Number,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video',
        },
    ],
    bookmarkVideos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video',
        },
    ],
    subscriptions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    subscribers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const model = mongoose.model('User', UserSchema);

export default model;
