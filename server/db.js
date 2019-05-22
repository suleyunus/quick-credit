const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  loansTable(
    id serial PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    createdOn TIMESTAMP,
    status VARCHAR(10),
    repaid VARCHAR(10),
    tenor INT NOT NULL,
    amount FLOAT(2) NOT NULL,
    paymentInstallment FLOAT(2),
    balance FLOAT(2),
    interest FLOAT(2) 
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

const dropTables = () => {
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
  createTables,
  dropTables,
};

require('make-runnable');
