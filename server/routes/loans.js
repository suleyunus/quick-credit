import express from 'express';
import loans from '../models/loansDB';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: loans,
  });
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

router.get('/?status=approved&repaid=false', (req, res) => {
  // const { status, repaid } = req.query;
  if (req.query.status === loans[0].status
    && req.query.repaid === Boolean(loans[0].repaid)) {
    res.status(200).json({
      status: 200,
      data: loans[0],
    });
  } else {
    res.status(404).json({
      message: 'Not Found',
    });
  }
});

export default router;
