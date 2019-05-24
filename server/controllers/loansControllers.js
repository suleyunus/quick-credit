import moment from 'moment';
import db from '../db/index';
import LoansHelper from '../helpers/loans';

class Loans {
  static async createLoan(req, res) {
    const text = `INSERT INTO
    loans(firstName, lastName, email, tenor, amount, paymentInstallment, status, balance, interest,
      repaid, createdOn)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    returning *`;
    const amount = parseFloat(req.body.amount);
    const tenor = parseInt(req.body.tenor, 10);
    const paymentInstallment = LoansHelper.paymentInstallment(amount, tenor);
    const balance = LoansHelper.balance(amount);
    const interest = LoansHelper.interest(amount);

    const values = [
      req.user.userFirstName,
      req.user.userLastName,
      req.user.userEmail,
      tenor,
      amount,
      paymentInstallment,
      'pending',
      balance,
      interest,
      false,
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).json({
        status: 201,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async getAllLoans(req, res) {
    const text = 'SELECT * FROM loans';

    try {
      const { rows, rowCount } = await db.query(text);
      return res.status(200).json({
        status: 200,
        rows,
        rowCount,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async getLoanByID(req, res) {
    const text = 'SELECT * FROM loans WHERE loanid = $1';

    try {
      const { rows } = await db.query(text, [req.params.loanID]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      return res.send(error);
    }
  }

  static async approveReject(req, res) {
    const queryText = 'SELECT * FROM loans WHERE loanid = $1';
    const updateText = 'UPDATE loans SET status = $1 WHERE loanid = $2';

    try {
      const { rows } = await db.query(queryText, [req.params.loanID]);

      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Not Found',
        });
      }

      const values = [
        req.body.status || rows[0].status,
        req.params.loanID,
      ];

      const response = await db.query(updateText, values);

      return res.status(200).json({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async postPayment(req, res) {
    const queryText = 'SELECT * FROM repayments WHERE loanid = $1';
    const updateText = 'UPDATE repayments SET balance = $1 WHERE loanid = $2';
    const paidAmount = parseFloat(req.body.paidAmount);

    try {
      const { rows } = await db.query(queryText, [req.params.loanID]);

      if (!rows[0]) {
        const newQueryText = 'SELECT * FROM loans WHERE loanid = $1';
        const newUpdateText = `INSERT INTO 
          repayments(loanid, amount, monthlyInstallment, paidAmount, balance, createdOn, dateModified)
          VALUES($1, $2, $3, $4, $5, $6, $7)
          returning *`;

        try {
          const { rows } = await db.query(newQueryText, [req.params.loanID]);

          if (!rows[0]) {
            return res.status(404).json({
              status: 404,
              message: 'No loan matches that ID',
            });
          }


          const balance = rows[0].balance - paidAmount;

          const values = [
            rows[0].loanid,
            rows[0].amount,
            rows[0].paymentinstallment,
            paidAmount,
            balance,
            rows[0].createdon,
            moment(new Date()),
          ];

          const createdPayment = await db.query(newUpdateText, values);

          return res.status(201).json({
            status: 201,
            data: rows[0],
          });
        } catch (error) {
          return res.status(400).send(error);
        }
      }

      const newBalance = rows[0].balance - parseFloat(req.body.paidAmount);

      const values = [
        newBalance,
        req.params.loanID,
      ];

      const response = await db.query(updateText, values);
      return res.status(201).json({
        status: 201,
        data: response.rows[0],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async getRepaymentByID(req, res) {
    const text = 'SELECT * FROM repayments WHERE loanid = $1';

    try {
      const { rows } = await db.query(text, [req.params.loanID]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      return res.send(error);
    }
  }
}

export default Loans;
