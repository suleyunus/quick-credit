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
    email VARCHAR(50) UNIQUE NOT NULL,
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

const createLoansTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  loans(
    id serial PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    createdOn TIMESTAMP NOT NULL,
    status VARCHAR(10) NOT NULL,
    repaid VARCHAR(10) NOT NULL,
    tenor INT NOT NULL,
    amount FLOAT(2) NOT NULL,
    paymentInstallment FLOAT(2) NOT NULL,
    balance FLOAT(2) NOT NULL,
    interest FLOAT(2) NOT NULL,
    FOREIGN KEY (email) references users (email) ON DELETE CASCADE
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
  const queryText = 'DROP TABLE IF EXISTS users';
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

const dropLoansTables = () => {
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

const createAllTables = () => {
  createUsersTables();
  createLoansTables();
};

const dropAllTables = () => {
  dropUsersTables();
  dropLoansTables();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createUsersTables,
  dropUsersTables,
  createLoansTables,
  dropLoansTables,
  createAllTables,
  dropAllTables,
};

require('make-runnable');
