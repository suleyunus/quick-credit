import express from 'express';
import loans from '../models/loansDB';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'Success',
    data: loans,
  });
});

export default router;
