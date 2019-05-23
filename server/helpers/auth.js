import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthHelper {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(email) {
    const token = jwt.sign({
      userEmail: email,
    },
    process.env.SECRET_KEY, { expiresIn: '3d' });
    return token;
  }
}

export default AuthHelper;
