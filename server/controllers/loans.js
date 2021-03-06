import loansModel from '../models/loans';
import repaymentsModel from '../models/Repayments';

class LoansControllers {
  static getLoans(req, res) {
    const allLoans = loansModel.getAllLoans();
    if (Object.keys(req.query).length === 0) {
      res.status(200).json({
        status: 200,
        data: allLoans,
      });
    } else if (req.query.repaid === 'false') {
      const currentLoans = allLoans.filter(loan => loan.status === 'approved'
    && loan.repaid === false);

      res.status(200).json({
        status: 200,
        data: currentLoans,
      });
    } else if (req.query.repaid === 'true') {
      const paidLoans = allLoans.filter(loan => loan.status === 'approved'
    && loan.repaid === true);

      res.status(200).json({
        status: 200,
        data: paidLoans,
      });
    }
  }

  static getByID(req, res) {
    const id = parseInt(req.params.loanID, 10);
    const specificLoan = loansModel.getLoanByID(id);

    if (!specificLoan) {
      res.status(404).json({
        status: 404,
        message: 'Not Found',
      });
    } else {
      res.status(200).json({
        status: 200,
        data: specificLoan,
      });
    }
  }

  static createLoan(req, res) {
    if (!req.body.amount && !req.body.tenor) {
      res.status(400).json({
        status: 400,
        message: 'Bad Request',
      });
    } else {
      const postedLoan = loansModel.postLoan(req.body, req.userData);
      res.status(200).json({
        status: 200,
        data: postedLoan,
      });
    }
  }

  static updateLoanStatus(req, res) {
    const id = parseInt(req.params.loanID, 10);
    const loan = loansModel.getLoanByID(id);

    if (!loan) {
      res.status(404).json({
        status: 404,
        message: 'No loan matches that ID',
      });
    } else {
      const loanStatus = req.body.status;
      const updatedLoan = loansModel.updateLoanStatus(loanStatus, loan);
      res.status(200).json({
        status: 200,
        data: updatedLoan,
      });
    }
  }

  static createRepayment(req, res) {
    const { paidAmount } = req.body;
    const id = parseInt(req.params.loanID, 10);
    const repayment = repaymentsModel.getRepaymentByID(id);

    if (!repayment) {
      const createNewRepayment = loansModel.getLoanByID(id);
      if (!createNewRepayment) {
        res.status(404).json({
          status: 404,
          message: 'No loan matches that ID',
        });
      } else {
        const createdRepayment = repaymentsModel.createRepayment(createNewRepayment, paidAmount);
        res.status(201).json({
          status: 201,
          data: createdRepayment,
        });
      }
    } else {
      const newRepayment = repaymentsModel.postRepayment(repayment, paidAmount);
      res.status(201).json({
        status: 200,
        data: newRepayment,
      });
    }
  }

  static repaymentHistory(req, res) {
    const id = parseInt(req.params.loanID, 10);
    const history = repaymentsModel.getRepaymentByID(id);

    if (!history) {
      res.status(404).json({
        status: 404,
        message: 'No repayments found for that ID',
      });
    } else {
      res.status(200).json({
        status: 200,
        data: history,
      });
    }
  }
}

export default LoansControllers;
