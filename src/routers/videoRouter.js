import express from 'express';
import routes from '../routes';
import {
    getUpload,
    postUpload,
    videoDetail,
    deleteVideo,
    getEditVideo,
    postEditVideo,
} from '../controllers/videoController';
import { onlyPrivate, uploadVideo } from '../middlewares';

const videoRouter = express.Router();

//upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

//detail
videoRouter.get(routes.videoDetail(), videoDetail);

//edit
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

//delete
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
