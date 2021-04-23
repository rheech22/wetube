"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controllers/videoController");

var _userController = require("../controllers/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = _express["default"].Router();

apiRouter.post(_routes["default"].registerView, _videoController.postRegisterView);
apiRouter.post(_routes["default"].addComment, _videoController.postAddComment);
apiRouter.post(_routes["default"].deleteComment, _videoController.deleteComment);
apiRouter.post(_routes["default"].editComment, _videoController.postEditComment);
apiRouter.post(_routes["default"].like, _videoController.likeVideo);
apiRouter.post(_routes["default"].dislike, _videoController.dislikeVideo);
apiRouter.post(_routes["default"].bookmark, _videoController.addBookmark);
apiRouter.post(_routes["default"].subscriptionFromProfile, _userController.addSubscriptionFromProfile);
apiRouter.post(_routes["default"].subscriptionFromVideo, _userController.addSubscriptionFromVideo);
apiRouter.get(_routes["default"].getUser, _videoController.getUserInfo);
var _default = apiRouter;
exports["default"] = _default;