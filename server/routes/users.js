import express from 'express';
import users from '../models/users';

const router = express.Router();

router.post('/api/v1/signin', (req, res) => {
  if (req.body.email === users[0].email
        && req.body.password === users[0].password) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
});

export default router;
