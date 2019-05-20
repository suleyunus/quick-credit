import bcrypt from 'bcrypt';
import usersModel from '../models/Users';

class Signup {
  static register(req, res) {
    const userExists = usersModel.findUser(req.body.email);

    if (userExists) {
      res.status(409).json({
        status: 409,
        message: 'User already exists',
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }
        const userInfo = req.body;
        userInfo.password = hash;
        const newAccount = usersModel.signUp(userInfo);
        return res.status(201).json({
          status: 201,
          data: newAccount,
        });
      });
    }
  }
}

export default Signup;
