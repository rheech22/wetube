"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportFacebook = _interopRequireDefault(require("passport-facebook"));

var _userController = require("./controllers/userController");

var _User = _interopRequireDefault(require("./models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GithubStrategy = require('passport-github').Strategy;

_passport["default"].use(_User["default"].createStrategy());

_passport["default"].use(new GithubStrategy({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/callback',
  scope: 'user.email'
}, _userController.githubLoginCallback));

_passport["default"].use(new _passportFacebook["default"]({
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: "https://c51104133224.ngrok.io/auth/facebook/callback",
  //ngrok끄면 안됨...
  profileFields: ['id', 'displayName', 'photos', 'email'],
  scope: ['public_profile', 'email']
}, _userController.facebookLoginCallback));

_passport["default"].serializeUser(_User["default"].serializeUser());

_passport["default"].deserializeUser(_User["default"].deserializeUser());