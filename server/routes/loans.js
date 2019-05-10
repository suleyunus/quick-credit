import express from 'express';
import loans from '../models/loansDB';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'Success',
    data: loans,
  });
});

router.get('/:loanID', (req, res, next) => {
  // const id = req.params.loanID;
  if (req.params.loanID === '1') {
    res.status(200).json({
      status: 'success',
      data: loans[0],
    });
  } else {
    res.status(404).json({
      message: 'Not Found',
    });
  }
});

export default router;
