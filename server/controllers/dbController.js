const bcrypt = require('bcrypt');
const pool = require('../database/psqlDB.js');

// Creates user from username and password form on /signup route. Encrypts password via Bcrypt and stores in database.
const createUser = (req, res) => {
  console.log('Im in createuser');
  const { username, password } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
    const insertUser = {
      text: `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
      values: [username, hash],
    };
    pool
      .query(insertUser)
      .then(user => {
        console.log('User successfully inserted into db: ', user.rows[0]);
        return res.json({ loggedIn: true });
      })
      .catch(() => res.status(400).json({ loggedIn: false }));
  });

  // Create JWT
  // const createToken = (req, res, next) => {
  //   // Get auth header value
  //   const token = jwt.sign({ id: user._id }, config.secret, {
  //     expiresIn: 86400, // expires in 24 hours
  //   });
  // };
};

// Confirms if username inputted on /login route matches username in database. If so, encrypts password, compares against Bcrypted password in db.
// Redirects to /signup page if no password or username match is found. Redirects to home page if there is a match.
const getUser = (req, res) => {
  const { username, password } = req.body;
  if (!password) return res.json({ username: null });
  pool
    .query(`SELECT * FROM users WHERE username = '${username}'`)
    .then(user => {
      if (!user.rows.length) return res.json({ username: null });
      const hash = user.rows[0].password;
      bcrypt.compare(password, hash, (err, result) => {
        if (err) return res.status(400).send('Error bcrypting', err);
        return res.json({ username });
      });
    })
    .catch(err => res.status(400).send('Could not get user', err));
};

// Export middleware.
module.exports = {
  createUser,
  getUser,
};
