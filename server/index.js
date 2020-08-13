const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const chalk = require('chalk');
const dotenv = require('dotenv');
const { sync } = require('./db/db');
const routes = require('./routes');
const { Session, User, Cart } = require('./db/models');
const { noDirectAccess, adminApiSecurityCheck, accessDeniedResponse } = require('./utils')


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/client/assets', express.static(path.join(__dirname, '../client/assets')));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(cookieParser());

dotenv.config();

app.use(async (req, res, next) => {

  const oneYear = 1000 * 60 * 60 * 24 * 7 * 52;
  try {
    if (req.cookies.session_id && req.cookies.cart_id) {

      req.session_id = req.cookies.session_id;
      req.cart_id = req.cookies.cart_id;

      const user = await User.findOne({
        include: [
          {
            model: Session,
            where: {
              id: req.session_id
            }
          }
        ]
      });

      if (user) {
        req.user = user;
      }

      next();
    }
    else {

      if (!req.cookies.session_id) {
        const session = await Session.create();

        res.cookie('session_id', session.id, {
          path: '/',
          expires: new Date(Date.now() + oneYear)
        });

        req.session_id = session.id;

      }

      if (!req.cookies.cart_id) {
        const cart = await Cart.create();

        res.cookie('cart_id', cart.id, {
          path: '/',
          expires: new Date(Date.now() + oneYear)
        });

        req.cart_id = cart.id;
      }


      next();

    }
  }
  catch (e) {
    console.log(e)
    res.sendStatus(500);
  }

});

app.use('/admin', (req, res, next) => {
  try {
    adminApiSecurityCheck(req)
    next();
  } catch (err) {
    accessDeniedResponse(err, res)
  }
});
app.use('/admin', express.static(path.join(__dirname, '../dist')));
app.use('/checkout', express.static(path.join(__dirname, '../dist')));

routes.forEach(({ url, router }) => {
  app.use(url, (req, res, next) => {
    noDirectAccess(req, res, next);
  });
  app.use(url, router);
});



app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use((err, req, res) => {
  console.error(err);
  res.status(500).send({ message: err.message });
});

// sync the db then start the server
sync(false)
  .then(() => {
    app.listen(PORT, () => console.log(chalk.cyan(`listening on port: ${PORT}`)));
  })
