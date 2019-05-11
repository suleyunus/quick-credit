"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _loansDB = _interopRequireDefault(require("../models/loansDB"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', function (req, res, next) {
  if (Object.keys(req.query).length === 0) {
    res.status(200).json({
      status: 200,
      data: _loansDB["default"]
    });
  } else if (req.query.repaid === 'false') {
    var currentLoans = _loansDB["default"].filter(function (loan) {
      return loan.status === 'approved' && loan.repaid === false;
    });

    res.status(200).json({
      status: 200,
      data: currentLoans
    });
  } else if (req.query.repaid === 'true') {
    var paidLoans = _loansDB["default"].filter(function (loan) {
      return loan.status === 'approved' && loan.repaid === true;
    });

    res.status(200).json({
      status: 200,
      data: paidLoans
    });
  }

  next();
});
router.get('/:loanID', function (req, res) {
  var id = parseInt(req.params.loanID, 10);

  var loanIndex = _loansDB["default"].findIndex(function (loan) {
    return loan.id === id;
  });

  if (loanIndex !== -1) {
    res.status(200).json({
      status: 200,
      data: _loansDB["default"][loanIndex]
    });
  } else {
    res.status(404).json({
      status: 404,
      message: 'Not Found'
    });
  }
}); // router.get('/?status=approved&repaid=false', (req, res) => {
//   // const { status, repaid } = req.query;
//   if (req.query.status === loans[0].status
//     && req.query.repaid === Boolean(loans[0].repaid)) {
//     res.status(200).json({
//       status: 200,
//       data: loans[0],
//     });
//   } else {
//     res.status(404).json({
//       message: 'Not Found',
//     });
//   }
// });

var _default = router;
exports["default"] = _default;