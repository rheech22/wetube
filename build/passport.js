"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _userController = require("./controllers/userController");

var _User = _interopRequireDefault(require("./models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import FacebookStrategy from 'passport-facebook';
// console.log(process.env.GH_CLIENT_ID);
// console.log(process.env.GH_CLIENT_SECRET);
// console.log(process.env.FB_CLIENT_ID);
// console.log(process.env.FB_CLIENT_SECRET);
var GithubStrategy = require('passport-github').Strategy;

var KakaoStrategy = require('passport-kakao').Strategy;

_passport["default"].use(_User["default"].createStrategy());

_passport["default"].use(new GithubStrategy({
  clientID: process.env.GH_CLIENT_ID,
  clientSecret: process.env.GH_CLIENT_SECRET,
  callbackURL: 'https://wetube22.herokuapp.com/auth/github/callback',
  scope: 'user.email'
}, _userController.githubLoginCallback));

_passport["default"].use(new KakaoStrategy({
  clientID: process.env.KT_CLIENT_ID,
  clientSecret: '',
  // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
  callbackURL: 'http://localhost:3000/auth/kakao/callback'
}, _userController.kakaoLoginCallback)); // passport.use(
//     new FacebookStrategy(
//         {
//             clientID: process.env.FB_CLIENT_ID,
//             clientSecret: process.env.FB_CLIENT_SECRET,
//             callbackURL: `https://c51104133224.ngrok.io/auth/facebook/callback`,
//             //ngrok끄면 안됨...
//             profileFields: ['id', 'displayName', 'photos', 'email'],
//             scope: ['public_profile', 'email'],
//         },
//         facebookLoginCallback,
//     ),
// );


_passport["default"].serializeUser(_User["default"].serializeUser());

_passport["default"].deserializeUser(_User["default"].deserializeUser()); // 카카오 로그인 시 serialized 오류로 인해 아래 코드를 썼지만,
// 아래 코드로 하면 bookmark, like, dislike, upload 다 오류남
// 카카오에서 넘어온 계정에 email정보가 없는 것을 보고 다시 받아오니
// 위 코드로 실행되는 것을 확인
// passport.serializeUser(function (user, cb) {
//     console.log('serialized');
//     cb(null, user.id);
// });
// passport.deserializeUser(function (id, cb) {
//     console.log('deserialized');
//     cb(null, id);
// });