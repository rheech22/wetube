"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSubscriptionFromVideo = exports.addSubscriptionFromProfile = exports.postChangePassword = exports.getChangePassword = exports.postEditProfile = exports.getEditProfile = exports.userDetail = exports.getMe = exports.logout = exports.postKakaoLogIn = exports.kakaoLoginCallback = exports.kakaoLogin = exports.postGithubLogIn = exports.githubLoginCallback = exports.githubLogin = exports.postLogin = exports.getLogin = exports.postJoin = exports.getJoin = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("../routes"));

var _User = _interopRequireDefault(require("../models/User"));

var _Videos = _interopRequireDefault(require("../models/Videos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getJoin = function getJoin(req, res) {
  res.render('join', {
    pageTitle: 'Join'
  });
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, name, email, password, password2, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;

            if (!(password !== password2)) {
              _context.next = 7;
              break;
            }

            req.flash('error', "Passwords don't match");
            res.status(400);
            res.render('join', {
              pageTitle: 'Join'
            });
            _context.next = 20;
            break;

          case 7:
            _context.prev = 7;
            _context.next = 10;
            return (0, _User["default"])({
              name: name,
              email: email
            });

          case 10:
            user = _context.sent;
            _context.next = 13;
            return _User["default"].register(user, password);

          case 13:
            next();
            _context.next = 20;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](7);
            console.log(_context.t0);
            res.redirect(_routes["default"].home);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 16]]);
  }));

  return function postJoin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  return res.render('login', {
    pageTitle: 'Log In'
  });
};

exports.getLogin = getLogin;

var postLogin = _passport["default"].authenticate('local', {
  failureRedirect: _routes["default"].login,
  successRedirect: _routes["default"].home,
  successFlash: 'Welcome',
  failureFlash: "Can't log in. Check email and/or password"
});

exports.postLogin = postLogin;

var githubLogin = _passport["default"].authenticate('github', {
  successFlash: 'Welcome',
  failureFlash: "Can't log in. Check email and/or password"
});

exports.githubLogin = githubLogin;

var githubLoginCallback = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, __, profile, cb) {
    var _profile$_json, id, avatarUrl, name, email, user, newUser;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _profile$_json = profile._json, id = _profile$_json.id, avatarUrl = _profile$_json.avatar_url, name = _profile$_json.name, email = _profile$_json.email;
            _context2.prev = 1;
            _context2.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            user = _context2.sent;

            if (!user) {
              _context2.next = 9;
              break;
            }

            user.githubId = id;
            user.save();
            return _context2.abrupt("return", cb(null, user));

          case 9:
            _context2.next = 11;
            return _User["default"].create({
              email: email,
              name: name,
              githubId: id,
              avatarUrl: avatarUrl
            });

          case 11:
            newUser = _context2.sent;
            return _context2.abrupt("return", cb(null, newUser));

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", cb(_context2.t0));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 15]]);
  }));

  return function githubLoginCallback(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.githubLoginCallback = githubLoginCallback;

var postGithubLogIn = function postGithubLogIn(req, res) {
  req.flash('success', 'Welcome');
  res.redirect(_routes["default"].home);
};

exports.postGithubLogIn = postGithubLogIn;

var kakaoLogin = _passport["default"].authenticate('kakao', {
  successFlash: 'Welcome',
  failureFlash: "Can't log in. Check email and/or password"
});

exports.kakaoLogin = kakaoLogin;

var kakaoLoginCallback = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, __, profile, cb) {
    var _profile$_json2, id, _profile$_json2$prope, name, profileImage, email, user, newUser;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _profile$_json2 = profile._json, id = _profile$_json2.id, _profile$_json2$prope = _profile$_json2.properties, name = _profile$_json2$prope.nickname, profileImage = _profile$_json2$prope.profile_image, email = _profile$_json2.kakao_account.email;
            console.log(profile);
            _context3.prev = 2;
            _context3.next = 5;
            return _User["default"].findOne({
              email: email
            });

          case 5:
            user = _context3.sent;

            if (!user) {
              _context3.next = 10;
              break;
            }

            user.kakaoId = id;
            user.save();
            return _context3.abrupt("return", cb(null, user));

          case 10:
            _context3.next = 12;
            return _User["default"].create({
              email: email,
              name: name,
              kakaoId: id,
              avatarUrl: profileImage
            });

          case 12:
            newUser = _context3.sent;
            return _context3.abrupt("return", cb(null, newUser));

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](2);
            return _context3.abrupt("return", cb(_context3.t0));

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 16]]);
  }));

  return function kakaoLoginCallback(_x8, _x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

exports.kakaoLoginCallback = kakaoLoginCallback;

var postKakaoLogIn = function postKakaoLogIn(req, res) {
  req.flash('success', 'Welcome');
  res.redirect(_routes["default"].home);
}; // export const facebookLogin = passport.authenticate('facebook');
// export const facebookLoginCallback = async (_, __, profile, cb) => {
//     const {
//         _json: { id, name, email },
//     } = profile;
//     try {
//         const user = await User.findOne({ email });
//         if (user) {
//             user.facebookId = id;
//             user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
//             user.save();
//             return cb(null, user);
//         }
//         const newUser = await User.create({
//             email,
//             name,
//             facebookId: id,
//             avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
//         });
//         return cb(null, newUser);
//     } catch (error) {
//         return cb(error);
//     }
// };
// export const postFacebookLogin = (req, res) => {
//     res.redirect(routes.home);
// };


exports.postKakaoLogIn = postKakaoLogIn;

var logout = function logout(req, res) {
  req.flash('info', 'Logged out, see you later');
  req.logout();
  res.redirect(_routes["default"].home); // res.render("logout", { pageTitle: "Log Out" });
};

exports.logout = logout;

var getMe = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _User["default"].findById(req.user.id).populate('videos').populate('bookmarkVideos');

          case 2:
            user = _context4.sent;
            res.render('userDetail', {
              pageTitle: 'User Detail',
              user: user
            });

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getMe(_x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}(); // export const users = (req, res) => res.render("users", { pageTitle: "Users" });


exports.getMe = getMe;

var userDetail = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _User["default"].findById(id).populate('videos').populate('bookmarkVideos');

          case 4:
            user = _context5.sent;
            res.render('userDetail', {
              pageTitle: 'User Detail',
              user: user
            });
            _context5.next = 12;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            req.flash('error', 'User not found');
            res.redirect(_routes["default"].home);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 8]]);
  }));

  return function userDetail(_x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.userDetail = userDetail;

var getEditProfile = function getEditProfile(req, res) {
  return res.render('editProfile', {
    pageTitle: 'Edit Profile'
  });
};

exports.getEditProfile = getEditProfile;

var postEditProfile = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body2, name, email, file;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, file = req.file;
            _context6.prev = 1;
            _context6.next = 4;
            return _User["default"].findByIdAndUpdate(req.user.id, {
              name: name,
              email: email,
              avatarUrl: file ? file.location : req.user.avatarUrl
            });

          case 4:
            req.flash('success', 'Profile updated');
            res.redirect(_routes["default"].me);
            _context6.next = 12;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](1);
            req.flash('error', "Can't update profile");
            res.redirect(_routes["default"].editProfile);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 8]]);
  }));

  return function postEditProfile(_x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postEditProfile = postEditProfile;

var getChangePassword = function getChangePassword(req, res) {
  return res.render('changePassword', {
    pageTitle: 'Change Password'
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var _req$body3, oldPassword, newPassword, newPassword1;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$body3 = req.body, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword, newPassword1 = _req$body3.newPassword1;
            _context7.prev = 1;

            if (!(newPassword !== newPassword1)) {
              _context7.next = 7;
              break;
            }

            req.flash('error', "Passwords don't match");
            res.status(400);
            res.redirect("/users/".concat(_routes["default"].changePassword));
            return _context7.abrupt("return");

          case 7:
            _context7.next = 9;
            return req.user.changePassword(oldPassword, newPassword);

          case 9:
            res.redirect(_routes["default"].me);
            _context7.next = 17;
            break;

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](1);
            req.flash('error', "Can't change password");
            res.status(400);
            res.redirect("/users/".concat(_routes["default"].changePassword));

          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 12]]);
  }));

  return function postChangePassword(_x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}();

exports.postChangePassword = postChangePassword;

var addSubscriptionFromProfile = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var id, user, subscription, subscriber, filteredSubscriptions, filteredSubscribers;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id, user = req.user;
            _context8.prev = 1;
            _context8.next = 4;
            return _User["default"].findById(id);

          case 4:
            subscription = _context8.sent;
            _context8.next = 7;
            return _User["default"].findById(user.id);

          case 7:
            subscriber = _context8.sent;

            if (subscriber.subscriptions.includes(id)) {
              filteredSubscriptions = subscriber.subscriptions.filter(function (element) {
                return element.toString() !== id.toString();
              });
              subscriber.subscriptions = filteredSubscriptions;
              filteredSubscribers = subscription.subscribers.filter(function (element) {
                return element.toString() !== user.id.toString();
              });
              subscription.subscribers = filteredSubscribers; // console.log('this guy has been already here!');

              res.status(206);
            } else {
              subscriber.subscriptions.push(id);
              subscription.subscribers.push(user.id); // console.log('this guy is Newbie!');

              res.status(200);
            }

            subscriber.save();
            subscription.save();
            _context8.next = 16;
            break;

          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](1);
            res.status(400);

          case 16:
            _context8.prev = 16;
            res.end();
            return _context8.finish(16);

          case 19:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 13, 16, 19]]);
  }));

  return function addSubscriptionFromProfile(_x20, _x21) {
    return _ref8.apply(this, arguments);
  };
}();

exports.addSubscriptionFromProfile = addSubscriptionFromProfile;

var addSubscriptionFromVideo = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var id, user, video, uploader, subscription, subscriber, filteredSubscriptions, filteredSubscribers;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            id = req.params.id, user = req.user;
            _context9.prev = 1;
            _context9.next = 4;
            return _Videos["default"].findById(id);

          case 4:
            _context9.next = 6;
            return _context9.sent.populate('creator');

          case 6:
            video = _context9.sent;
            uploader = video.creator;
            _context9.next = 10;
            return _User["default"].findById(uploader);

          case 10:
            subscription = _context9.sent;
            _context9.next = 13;
            return _User["default"].findById(user.id);

          case 13:
            subscriber = _context9.sent;

            if (subscriber.subscriptions.includes(subscription.id)) {
              filteredSubscriptions = subscriber.subscriptions.filter(function (element) {
                return element.toString() !== subscription.id.toString();
              });
              subscriber.subscriptions = filteredSubscriptions;
              filteredSubscribers = subscription.subscribers.filter(function (element) {
                return element.toString() !== user.id.toString();
              });
              subscription.subscribers = filteredSubscribers; // console.log('this guy has been already here!');

              res.status(206);
            } else {
              subscriber.subscriptions.push(subscription.id);
              subscription.subscribers.push(user.id); // console.log('this guy is Newbie!');

              res.status(200);
            }

            subscriber.save();
            subscription.save();
            _context9.next = 22;
            break;

          case 19:
            _context9.prev = 19;
            _context9.t0 = _context9["catch"](1);
            res.status(400);

          case 22:
            _context9.prev = 22;
            res.end();
            return _context9.finish(22);

          case 25:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 19, 22, 25]]);
  }));

  return function addSubscriptionFromVideo(_x22, _x23) {
    return _ref9.apply(this, arguments);
  };
}();

exports.addSubscriptionFromVideo = addSubscriptionFromVideo;