import express from 'express';
import usersModel from '../models/users';

const router = express.Router();

router.post('/', (req, res) => {
  const user = usersModel.findUser(req.body.email);

  if (!user) {
    res.status(404).json({
      status: 404,
      message: 'Account not found',
    });
  } else if (req.body.password === user.password) {
    res.status(200).json({
      status: 200,
      data: user,
    });
  } else {
    res.status(401).json({
      status: 401,
      message: 'Unauthorized',
    });
  }
});

export default router;
