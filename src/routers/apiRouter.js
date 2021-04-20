import express from 'express';
import routes from '../routes';
import {
    postRegisterView,
    postAddComment,
    deleteComment,
    likeVideo,
    dislikeVideo,
    addBookmark,
} from '../controllers/videoController';
import {
    addSubscriptionFromProfile,
    addSubscriptionFromVideo,
} from '../controllers/userController';

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment, deleteComment);
apiRouter.post(routes.like, likeVideo);
apiRouter.post(routes.dislike, dislikeVideo);
apiRouter.post(routes.bookmark, addBookmark);
apiRouter.post(routes.subscriptionFromProfile, addSubscriptionFromProfile);
apiRouter.post(routes.subscriptionFromVideo, addSubscriptionFromVideo);

export default apiRouter;
