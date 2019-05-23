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
}

export default Loans;
