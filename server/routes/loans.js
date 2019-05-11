import express from 'express';
import loans from '../models/loansDB';

const router = express.Router();

router.get('/', (req, res, next) => {
  if (Object.keys(req.query).length === 0) {
    res.status(200).json({
      status: 200,
      data: loans,
    });
  } else if (req.query.repaid === 'false') {
    const currentLoans = loans.filter(loan => loan.status === 'approved'
    && loan.repaid === false);

    res.status(200).json({
      status: 200,
      data: currentLoans,
    });
  } else if (req.query.repaid === 'true') {
    const paidLoans = loans.filter(loan => loan.status === 'approved'
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
  const loanIndex = loans.findIndex(loan => loan.id === id);

  if (loanIndex !== -1) {
    res.status(200).json({
      status: 200,
      data: loans[loanIndex],
    });
  } else {
    res.status(404).json({
      status: 404,
      message: 'Not Found',
    });
  }
});

// router.get('/?status=approved&repaid=false', (req, res) => {
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

export default router;
