"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/api/v1/signin', function (req, res) {
  if (req.body.email === _users["default"][0].email && req.body.password === _users["default"][0].password) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
});
var _default = router;
exports["default"] = _default;