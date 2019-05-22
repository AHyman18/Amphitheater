const { Pool } = require('pg');
// Connects to database
const pool = new Pool({
  user: 'otpqftii',
  host: 'isilo.db.elephantsql.com',
  password: 'nizupVSoOm0fWv2Ly6asZT5pNNzKj2Rn',
  database: 'otpqftii',
  port: 5432,
});

pool.connect((err, client, done) => {
  if (err) return console.error('Could not connect to PostgreSQL db!');
  console.log('Successfully connected to PostgreSQL db!');
});

module.exports = pool;