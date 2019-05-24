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
    email VARCHAR(128) UNIQUE NOT NULL,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128),
    password VARCHAR(128),
    address VARCHAR(128) NOT NULL,
    status VARCHAR(10) NOT NULL,
    isAdmin BOOLEAN NOT NULL,
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
    loanId serial PRIMARY KEY,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    tenor INT NOT NULL,
    amount FLOAT(2) NOT NULL,
    paymentInstallment FLOAT(2) NOT NULL,
    status VARCHAR(10) NOT NULL,
    balance FLOAT(2) NOT NULL,
    interest FLOAT(2) NOT NULL,
    repaid BOOLEAN NOT NULL,
    createdOn TIMESTAMP NOT NULL,
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

const createRepaymentsTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  repayments(
    id serial PRIMARY KEY,
    loanId INT NOT NULL,
    amount FLOAT(2) NOT NULL,
    monthlyInstallment FLOAT(2) NOT NULL,
    paidAmount FLOAT(2) NOT NULL,
    balance FLOAT(2) NOT NULL,
    createdOn TIMESTAMP NOT NULL,
    dateModified TIMESTAMP NOT NULL,
    FOREIGN KEY (loanId) references loans (loanId) ON DELETE CASCADE
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

const dropRepaymentsTables = () => {
  const queryText = 'DROP TABLE IF EXISTS repayments';
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
  createRepaymentsTables();
};

const dropAllTables = () => {
  dropUsersTables();
  dropLoansTables();
  dropRepaymentsTables();
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
  createRepaymentsTables,
  dropRepaymentsTables,
  createAllTables,
  dropAllTables,
};

require('make-runnable');
