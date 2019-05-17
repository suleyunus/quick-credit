import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import usersModel from '../models/users';

const router = express.Router();

router.post('/', (req, res) => {
  const user = usersModel.findUser(req.body.email);

  if (!user) {
    res.status(404).json({
      status: 404,
      message: 'Account not found',
    });
  }

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: 'Unauthorized',
      });
    }
    if (result) {
      const token = jwt.sign(user.email, process.env.JWT_KEY);
      user.token = token;
      return res.status(200).json({
        status: 200,
        data: user,
      });
    }
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized',
    });
  });
});

export default router;
