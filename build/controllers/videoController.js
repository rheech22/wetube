"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserInfo = exports.addBookmark = exports.dislikeVideo = exports.likeVideo = exports.postEditComment = exports.deleteComment = exports.postAddComment = exports.postRegisterView = exports.deleteVideo = exports.postEditVideo = exports.getEditVideo = exports.videoDetail = exports.postUpload = exports.getUpload = exports.search = exports.home = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _Videos = _interopRequireDefault(require("../models/Videos"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var videos;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Videos["default"].find({}).sort({
              _id: -1
            });

          case 3:
            videos = _context.sent;
            res.render('home', {
              pageTitle: 'Home',
              videos: videos
            });
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.render('home', {
              pageTitle: 'Home',
              videos: []
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var search = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var searchingBy, videos;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            searchingBy = req.query.term; // 위 코드는 const searchyingBy = req.query.term 과 같음

            videos = [];
            _context2.prev = 2;
            _context2.next = 5;
            return _Videos["default"].find({
              title: {
                $regex: searchingBy,
                $options: 'i'
              }
            });

          case 5:
            videos = _context2.sent;
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);

          case 11:
            res.render('search', {
              pageTitle: 'Search',
              searchingBy: searchingBy,
              videos: videos
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8]]);
  }));

  return function search(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.search = search;

var getUpload = function getUpload(req, res) {
  return res.render('upload', {
    pageTitle: 'Upload'
  });
};

exports.getUpload = getUpload;

var postUpload = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, title, description, location, _req$createdAt, createdAt, newVideo;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, location = req.file.location, _req$createdAt = req.createdAt, createdAt = _req$createdAt === void 0 ? Date.now() : _req$createdAt;
            _context3.next = 3;
            return _Videos["default"].create({
              fileUrl: location,
              title: title,
              description: description,
              createdAt: createdAt,
              creator: req.user.id
            });

          case 3:
            newVideo = _context3.sent;
            req.user.videos.push(newVideo.id);
            req.user.save();
            res.redirect(_routes["default"].videoDetail(newVideo.id));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postUpload(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postUpload = postUpload;

var videoDetail = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, video, videos, otherVideos, shuffle, videoDate, getFormattedDate, uploadDate;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _Videos["default"].findById(id).populate('creator').populate({
              path: 'comments',
              populate: {
                path: 'creator',
                select: 'name avatarUrl'
              }
            });

          case 4:
            video = _context4.sent;
            _context4.next = 7;
            return _Videos["default"].find({}).sort({
              _id: -1
            });

          case 7:
            videos = _context4.sent;
            otherVideos = videos.filter(function (element) {
              return element.id.toString() !== id.toString();
            });

            shuffle = function shuffle(array) {
              for (var i = array.length - 1; i > 0; i -= 1) {
                var j = Math.floor(Math.random() * (i + 1));
                var _ref5 = [array[j], array[i]];
                array[i] = _ref5[0];
                array[j] = _ref5[1];
              }
            };

            shuffle(otherVideos); //date_video

            videoDate = video.createdAt;

            getFormattedDate = function getFormattedDate(date) {
              var year = date.getFullYear();
              var month = (1 + date.getMonth()).toString().padStart(2, '0');
              var day = date.getDate().toString().padStart(2, '0');
              return "".concat(year, ".").concat(month, ".").concat(day);
            };

            uploadDate = getFormattedDate(videoDate);
            res.render('videoDetail', {
              pageTitle: video.title,
              video: video,
              otherVideos: otherVideos,
              uploadDate: uploadDate
            });
            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](1);
            res.redirect(_routes["default"].home);

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 17]]);
  }));

  return function videoDetail(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.videoDetail = videoDetail;

var getEditVideo = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _Videos["default"].findById(id);

          case 4:
            video = _context5.sent;

            if (!(video.creator.toString() !== req.user.id)) {
              _context5.next = 9;
              break;
            }

            throw Error();

          case 9:
            res.render('editVideo', {
              pageTitle: "Edit ".concat(video.title),
              video: video
            });

          case 10:
            _context5.next = 15;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            res.redirect(_routes["default"].home);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));

  return function getEditVideo(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getEditVideo = getEditVideo;

var postEditVideo = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, _req$body2, title, description;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id, _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
            _context6.prev = 1;
            _context6.next = 4;
            return _Videos["default"].findOneAndUpdate({
              _id: id
            }, {
              title: title,
              description: description
            });

          case 4:
            res.redirect(_routes["default"].videoDetail(id));
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](1);
            res.redirect(_routes["default"].home);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 7]]);
  }));

  return function postEditVideo(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

exports.postEditVideo = postEditVideo;

var deleteVideo = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id, video, user, filteredVideos;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.prev = 1;
            _context7.next = 4;
            return _Videos["default"].findById(id);

          case 4:
            video = _context7.sent;
            _context7.next = 7;
            return _User["default"].findById(req.user.id);

          case 7:
            user = _context7.sent;

            if (!(video.creator.toString() !== req.user.id)) {
              _context7.next = 12;
              break;
            }

            throw Error();

          case 12:
            _context7.next = 14;
            return _Videos["default"].findOneAndRemove({
              _id: id
            });

          case 14:
            filteredVideos = user.videos.filter(function (element) {
              return element.toString() !== id.toString();
            });
            user.videos = filteredVideos;
            user.save();

          case 17:
            _context7.next = 22;
            break;

          case 19:
            _context7.prev = 19;
            _context7.t0 = _context7["catch"](1);
            console.log(_context7.t0);

          case 22:
            _context7.prev = 22;
            res.end();
            return _context7.finish(22);

          case 25:
            res.redirect(_routes["default"].home);

          case 26:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 19, 22, 25]]);
  }));

  return function deleteVideo(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}(); // Register Video View


exports.deleteVideo = deleteVideo;

var postRegisterView = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            _context8.prev = 1;
            _context8.next = 4;
            return _Videos["default"].findById(id);

          case 4:
            video = _context8.sent;
            video.views += 1;
            video.save();
            res.status(200);
            _context8.next = 13;
            break;

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](1);
            res.status(400);

          case 13:
            _context8.prev = 13;
            res.end();
            return _context8.finish(13);

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 10, 13, 16]]);
  }));

  return function postRegisterView(_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}(); //Handle Comment


exports.postRegisterView = postRegisterView;

var postAddComment = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var id, comment, user, _req$createdAt2, createdAt, video, newComment;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            id = req.params.id, comment = req.body.comment, user = req.user, _req$createdAt2 = req.createdAt, createdAt = _req$createdAt2 === void 0 ? Date.now() : _req$createdAt2;
            _context9.prev = 1;
            _context9.next = 4;
            return _Videos["default"].findById(id);

          case 4:
            video = _context9.sent;
            _context9.next = 7;
            return _Comment["default"].create({
              text: comment,
              creator: user.id,
              videos: id,
              createdAt: createdAt // creator: req.user.id,

            });

          case 7:
            newComment = _context9.sent;
            // console.log(user.id);
            // console.log(id);
            // console.log(newComment.id);
            video.comments.push(newComment.id);
            video.save();
            _context9.next = 15;
            break;

          case 12:
            _context9.prev = 12;
            _context9.t0 = _context9["catch"](1);
            // req.flash('error', 'You need to be logged in.');
            res.status(400);

          case 15:
            _context9.prev = 15;
            res.end();
            return _context9.finish(15);

          case 18:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 12, 15, 18]]);
  }));

  return function postAddComment(_x17, _x18) {
    return _ref10.apply(this, arguments);
  };
}();

exports.postAddComment = postAddComment;

var deleteComment = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var id, index, video, commentList;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            id = req.params.id, index = req.body.index;
            _context10.prev = 1;
            _context10.next = 4;
            return _Videos["default"].findById(id);

          case 4:
            video = _context10.sent;
            commentList = video.comments.reverse();
            console.log("".concat(index, "-fourth"));
            console.log(commentList); // const deleteCommentId = video.comments.reverse()[index];

            commentList.splice(index, 1);
            console.log(commentList);
            video.comments.reverse();
            video.save(); // await Comment.findOneAndRemove({ _id: deleteCommentId });

            _context10.next = 18;
            break;

          case 14:
            _context10.prev = 14;
            _context10.t0 = _context10["catch"](1);
            console.log('error');
            res.status(400);

          case 18:
            _context10.prev = 18;
            res.end();
            return _context10.finish(18);

          case 21:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 14, 18, 21]]);
  }));

  return function deleteComment(_x19, _x20) {
    return _ref11.apply(this, arguments);
  };
}();

exports.deleteComment = deleteComment;

var postEditComment = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
    var id, _req$body3, index, comment, video, commentList, commentID;

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            id = req.params.id, _req$body3 = req.body, index = _req$body3.index, comment = _req$body3.comment;
            _context11.prev = 1;
            _context11.next = 4;
            return _Videos["default"].findById(id);

          case 4:
            video = _context11.sent;
            commentList = video.comments.reverse();
            commentID = commentList.splice(index, 1);
            console.log(commentID);
            _context11.next = 10;
            return _Comment["default"].findByIdAndUpdate(commentID, {
              text: comment
            });

          case 10:
            _context11.next = 16;
            break;

          case 12:
            _context11.prev = 12;
            _context11.t0 = _context11["catch"](1);
            console.log('error');
            res.status(400);

          case 16:
            _context11.prev = 16;
            res.end();
            return _context11.finish(16);

          case 19:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[1, 12, 16, 19]]);
  }));

  return function postEditComment(_x21, _x22) {
    return _ref12.apply(this, arguments);
  };
}(); //like and dislike
//해당 array에 null 값이 들어가서 bad request 400 이 나오는 오류 수정
//db에서 직접 null값을 제거해주니 정상작동.. 어떻게 null 값이 들어갔는지는 모르겠음


exports.postEditComment = postEditComment;

var likeVideo = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
    var id, user, video, filteredLikes, filteredDislikes;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            id = req.params.id, user = req.user;
            _context12.prev = 1;
            _context12.next = 4;
            return _Videos["default"].findById(id);

          case 4:
            video = _context12.sent;

            if (video.likes.includes(user.id)) {
              filteredLikes = video.likes.filter(function (element) {
                return element.toString() !== user.id.toString();
              });
              video.likes = filteredLikes; // console.log('this guy has been already here!');

              res.status(206);
            } else if (video.dislikes.includes(user.id)) {
              filteredDislikes = video.dislikes.filter(function (element) {
                return element.toString() !== user.id.toString();
              });
              video.dislikes = filteredDislikes;
              video.likes.push(user.id); // console.log('this guy had disliked this video!');

              res.status(207);
            } else {
              video.likes.push(user.id); // console.log('this guy is Newbie!');

              res.status(200);
            }

            video.save();
            _context12.next = 12;
            break;

          case 9:
            _context12.prev = 9;
            _context12.t0 = _context12["catch"](1);
            // req.flash('error', 'You need to be logged in.');
            res.status(400);

          case 12:
            _context12.prev = 12;
            res.end();
            return _context12.finish(12);

          case 15:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[1, 9, 12, 15]]);
  }));

  return function likeVideo(_x23, _x24) {
    return _ref13.apply(this, arguments);
  };
}();

exports.likeVideo = likeVideo;

var dislikeVideo = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
    var id, user, video, filteredDislikes, filteredLikes;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            id = req.params.id, user = req.user;
            _context13.prev = 1;
            _context13.next = 4;
            return _Videos["default"].findById(id);

          case 4:
            video = _context13.sent;

            if (video.dislikes.includes(user.id)) {
              filteredDislikes = video.dislikes.filter(function (element) {
                return element.toString() !== user.id.toString();
              });
              video.dislikes = filteredDislikes; // console.log('this guy has been already here!');

              res.status(206);
            } else if (video.likes.includes(user.id)) {
              filteredLikes = video.likes.filter(function (element) {
                return element.toString() !== user.id.toString();
              });
              video.likes = filteredLikes;
              video.dislikes.push(user.id); // console.log('this guy had liked this video!');

              res.status(207);
            } else {
              video.dislikes.push(user.id); // console.log('this guy is Newbie!');

              res.status(200);
            }

            video.save();
            _context13.next = 12;
            break;

          case 9:
            _context13.prev = 9;
            _context13.t0 = _context13["catch"](1);
            // req.flash('error', 'You need to be logged in.');
            res.status(400);

          case 12:
            _context13.prev = 12;
            res.end();
            return _context13.finish(12);

          case 15:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[1, 9, 12, 15]]);
  }));

  return function dislikeVideo(_x25, _x26) {
    return _ref14.apply(this, arguments);
  };
}(); //Bookmark


exports.dislikeVideo = dislikeVideo;

var addBookmark = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(req, res) {
    var id, user, video, bookmarkUser, filteredBookmarkUsers, filteredBookmarkVideos;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            id = req.params.id, user = req.user;
            _context14.prev = 1;
            _context14.next = 4;
            return _Videos["default"].findById(id);

          case 4:
            video = _context14.sent;
            _context14.next = 7;
            return _User["default"].findById(user.id);

          case 7:
            bookmarkUser = _context14.sent;
            console.log(video.bookmarkUsers);
            console.log(bookmarkUser.bookmarkVideos);

            if (video.bookmarkUsers.includes(user.id)) {
              filteredBookmarkUsers = video.bookmarkUsers.filter(function (element) {
                return element.toString() !== user.id.toString();
              });
              video.bookmarkUsers = filteredBookmarkUsers;
              filteredBookmarkVideos = bookmarkUser.bookmarkVideos.filter(function (element) {
                return element.toString() !== id.toString();
              });
              bookmarkUser.bookmarkVideos = filteredBookmarkVideos; // console.log('this guy has been already here!');

              res.status(206);
            } else {
              video.bookmarkUsers.push(user.id);
              bookmarkUser.bookmarkVideos.push(id); // console.log('this guy is Newbie!');

              res.status(200);
            }

            video.save();
            bookmarkUser.save();
            console.log(video.bookmarkUsers);
            console.log(bookmarkUser.bookmarkVideos);
            _context14.next = 20;
            break;

          case 17:
            _context14.prev = 17;
            _context14.t0 = _context14["catch"](1);
            // req.flash('error', 'You need to be logged in.');
            res.status(400);

          case 20:
            _context14.prev = 20;
            res.end();
            return _context14.finish(20);

          case 23:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[1, 17, 20, 23]]);
  }));

  return function addBookmark(_x27, _x28) {
    return _ref15.apply(this, arguments);
  };
}();

exports.addBookmark = addBookmark;

var getUserInfo = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            user = req.user;

            try {
              console.log(user);
            } catch (error) {
              res.status(400);
            } finally {
              res.end();
            }

          case 2:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));

  return function getUserInfo(_x29, _x30) {
    return _ref16.apply(this, arguments);
  };
}();

exports.getUserInfo = getUserInfo;