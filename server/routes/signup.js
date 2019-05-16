import express from 'express';
import usersModel from '../models/users';

const router = express.Router();

router.post('/', (req, res) => {
  const newAccount = usersModel.signUp(req.body);
  res.status(201).json({
    status: 201,
    data: newAccount,
  });
});

export default router;
