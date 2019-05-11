"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _users = _interopRequireDefault(require("./routes/users"));

var _loans = _interopRequireDefault(require("./routes/loans"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
})); // Routes which should handle requests

app.use(_users["default"]);
app.use('/api/v1/loans', _loans["default"]); // app.use((req, res, next) => {
//   const error = new Error('Not Found');
//   error.status = 404;
//   next(error);
// })
// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message
//     }
//   })
// });

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("server started on port ".concat(PORT));
});