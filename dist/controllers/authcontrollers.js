"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var checkToken = function checkToken(req, res, next) {
  var bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(' ');
    var bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403);
  }
};