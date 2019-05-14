import express from 'express';
import check from 'express-validator';
import loansModel from '../models/loans';

const router = express.Router();

router.get('/', (req, res, next) => {
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
  next();
});

router.get('/:loanID', (req, res) => {
  const id = parseInt(req.params.loanID, 10);
  const specificLoan = loansModel.getLoanByID(id);

  if (specificLoan !== []) {
    res.status(200).json({
      status: 200,
      data: specificLoan,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: 'Not Found',
    });
  }
});

router.post('/', (req, res) => {
  const postedLoan = loansModel.postLoan(req.body);
  res.status(200).json({
    status: 200,
    data: postedLoan,
  });
});

export default router;
