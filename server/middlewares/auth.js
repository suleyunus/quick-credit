import jwt from 'jsonwebtoken';
import db from '../db/index';

class Auth {
  static async verifyToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(400).json({
        status: 400,
        message: 'No token provided',
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      const text = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await db.query(text, [decoded.userEmail]);
      if (!rows[0]) {
        return res.status(400).json({
          status: 400,
          message: 'Invalid token',
        });
      }
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default Auth;
