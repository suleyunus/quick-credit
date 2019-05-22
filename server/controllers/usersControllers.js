import moment from 'moment';
import db from '../db/index';

class Users {
  static async signup(req, res) {
    const text = `INSERT INTO
      users(email, firstName, lastName, password, address, status, isAdmin, dateJoined)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const values = [
      req.body.email,
      req.body.firstName,
      req.body.lastName,
      req.body.password,
      req.body.address,
      'unverified',
      false,
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async signin(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    const { email } = req.body;

    try {
      const { rows } = await db.query(text, [email]);
      if (!rows[0]) {
        return res.status(400).send({
          message: 'No account found',
        });
      }
      return res.status(200).send({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      res.status(400).send(error)
    }
  }
}

export default Users;
