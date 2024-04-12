const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const flash = require('connect-flash');

dotenv.config();

const app = express();
const cors = require('cors');
app.use(express.json());

app.use(cors());

require('./db/db');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.urlencoded({ extended: false }));

require('./config/passport');
require('./config/jwt');

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// app.listen(12111, '0.0.0.0', () => {
//   console.log(`App listening on port 12111`);
// }
// );

app.use(require('./routes/routes'));

module.exports = app;
