const { Router } = require("express");

const userRouter = Router();
const bcrypt = require("bcrypt");
const chalk = require("chalk");

const { User, Session } = require("../db/models/index");
const Cart = require("../db/models/cart");


//
// LOGIN FLOW
//
userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      console.log(chalk.black(chalk.bgGreen(`${user.username} LOGGED IN`)));

      let userSession;
      userSession = await Session.findByPk(req.session_id);

      let userCart;
      userCart = await Cart.findOne({
        where: {
          completed: false
        }
      });
      if (userCart) {
        req.cart_id = userCart.id;

        res.clearCookie("cart_id");

        const oneWeek = 1000 * 60 * 60 * 24 * 7;

        res.cookie("cart_id", userCart.id, {
          path: "/",
          expires: new Date(Date.now() + oneWeek),
        });

      } else {
        userCart = await Cart.findByPk(req.cart_id);
        if (!userCart) {
          res.clearCookie("cart_id");

          const cart = await Cart.create();

          const oneWeek = 1000 * 60 * 60 * 24 * 7;

          res.cookie("cart_id", cart.id, {
            path: "/",
            expires: new Date(Date.now() + oneWeek),
          });

          req.cart_id = cart.id;

          userCart = await Cart.findByPk(req.cart_id);
        }
      }

      if (!userSession) {
        res.clearCookie("session_id");
        const session = await Session.create();

        const oneWeek = 1000 * 60 * 60 * 24 * 7;

        res.cookie("session_id", session.id, {
          path: "/",
          expires: new Date(Date.now() + oneWeek),
        });

        req.session_id = session.id;
        userSession = await Session.findByPk(req.session_id);
      }

      await userSession.setUser(user);
      await userCart.setUser(user);

      res.sendStatus(200);
    } else {
      res.status(401).send({
        message: "incorrect password",
      });
    }
  } else {
    res.status(401).send({
      message: "incorrect username",
    });
  }
});

userRouter.get("/whoami", (req, res) => {
  if (req.user) {
    res.send({
      username: req.user.username,
      loggedIn: true,
    });
  } else {
    res.send({
      username: null,
      loggedIn: false,
    });
  }
});

userRouter.get("/logout", async (req, res) => {
  try {
    res.clearCookie("session_id");
    res.clearCookie("cart_id");
    console.log(chalk.black(chalk.bgGreen(`${req.user.username} LOGGED OUT`)));
    res.sendStatus(200);
  } catch (e) {
    console.log(e)
    res.status(500).send(e);
  }
});

// Basic user API calls
userRouter.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.status(200).send(users);
});

userRouter.post("/users", async (req, res) => {
  const { username, password, role } = req.body;
  const createdUser = await User.create({ username, password, role })
  res.status(201).send({
    user: createdUser,
    message: `User ${username} created sucessfully`
  })
})

userRouter.put('/users/:id', async (req, res) => {
  const { username, password, role, id } = req.body
  await User.update({ username, password, role }, { where: { id } })
  const users = await User.findAll()
  res.send(users);
})

userRouter.delete('/users/:id', async (req, res) => {
  const deletedUser = await User.findByPk(req.params.id)
  await deletedUser.destroy()
  const users = await User.findAll()
  res.send(users);
})

module.exports = {
  path: '/user',
  router: userRouter
};
