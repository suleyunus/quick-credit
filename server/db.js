const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createUsersTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  users(
    id serial PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    firstName VARCHAR(15) NOT NULL,
    lastName VARCHAR(15),
    password VARCHAR(50),
    address VARCHAR(30) NOT NULL,
    status VARCHAR(10) NOT NULL,
    isAdmin VARCHAR(7) NOT NULL,
    dateJoined TIMESTAMP 
  )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropUsersTables = () => {
  const queryText = 'DROP TABLE IF EXISTS loans';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createUsersTables,
  dropUsersTables,
};

require('make-runnable');
