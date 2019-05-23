import moment from 'moment';
import db from '../db/index';
import AuthHelper from '../helpers/auth';

class Users {
  static async signup(req, res) {
    const hashPassword = AuthHelper.hashPassword(req.body.password);

    const text = `INSERT INTO
      users(email, firstName, lastName, password, address, status, isAdmin, dateJoined)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const values = [
      req.body.email,
      req.body.firstName,
      req.body.lastName,
      hashPassword,
      req.body.address,
      'unverified',
      req.body.isAdmin,
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(text, values);
      const token = AuthHelper.generateToken(rows[0].email, rows[0].firstname, rows[0].lastname);
      return res.status(201).json({
        status: 201,
        data: token,
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({
          status: 400,
          message: 'User with that Email already exists',
        });
      }
      return res.status(400).send(error);
    }
  }

  static async signin(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';

    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({
          message: 'No account found',
        });
      }
      if (!AuthHelper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(401).json({
          status: 401,
          message: 'Unauthorized',
        });
      }

      const token = AuthHelper.generateToken(rows[0].email, rows[0].firstname, rows[0].lastname);
      return res.status(200).json({
        status: 200,
        data: token,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async verifyUser(req, res) {
    const queryText = 'SELECT * FROM users where email=$1';
    const updateText = 'UPDATE users SET status=$1 WHERE email=$2';
    
    try {
      const { rows } = await db.query(queryText, [req.params.userEmail]);
  
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Not found',
        });
      }

      const values = [
        req.body.status || rows[0].status,
        req.params.userEmail,
      ];

      const response = await db.query(updateText, values);

      return res.status(200).json({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default Users;
