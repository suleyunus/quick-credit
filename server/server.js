import express from 'express';
import jwt from 'jsonwebtoken';
import users from './models/mock-db';

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'welcome to the API',
  });
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post Created...',
        authData,
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  jwt.sign({ user: users[0] }, 'secretkey', { expiresIn: '60s'}, (err, token) => {
    res.json({ token });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();

  } else {
    res.sendStatus(403);
  }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
