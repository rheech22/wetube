"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CommentShema = new _mongoose["default"].Schema({
  text: {
    type: String,
    required: 'Text is required'
  },
  createdAt: {
    type: Date,
    dafault: Date.now
  },
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  videos: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Video'
  }
});

var model = _mongoose["default"].model('Comment', CommentShema);

var _default = model;
exports["default"] = _default;