import express from 'express';
import loans from '../models/loansDB';
import users from '../models/users';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: loans,
  });
});

router.get('/:loanID', (req, res) => {
  // const id = req.params.loanID;
  if (req.params.loanID === '1') {
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

router.get('/?status=approved&repaid=false', (req, res) => {
  // const { status, repaid } = req.query;
  if (req.query.status === loans[0].status &&
    req.query.repaid === Boolean(loans[0].repaid)) {
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
