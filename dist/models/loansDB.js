"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var loans = [{
  id: 1,
  user: 'john.doe@gmail.com',
  createdOn: '30, July 2018',
  status: 'pending',
  repaid: false,
  tenor: 30,
  amount: 2000,
  paymentInstallment: 2000,
  balance: 2000,
  interest: 100
}, {
  id: 2,
  user: 'jane.rivers@gmail.com',
  createdOn: '30, August 2018',
  status: 'pending',
  repaid: false,
  tenor: 30,
  amount: 4000,
  paymentInstallment: 4000,
  balance: 4000,
  interest: 200
}, {
  id: 3,
  user: 'peterson@gmail.com',
  createdOn: '30, August 2018',
  status: 'approved',
  repaid: false,
  tenor: 30,
  amount: 4000,
  paymentInstallment: 4000,
  balance: 4000,
  interest: 200
}];
var _default = loans;
exports["default"] = _default;