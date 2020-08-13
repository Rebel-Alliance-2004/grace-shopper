const { Router } = require("express");
const chalk = require('chalk');
const { syncCartAndCookie } = require('../utils')

const cartRouter = Router();
const { Cart, Product, ProductCart } = require('../db/models/index');

cartRouter.post('/add/:id', async (req, res) => {
  try {
    const { quantity } = req.query;
    const { id } = req.params;

    // defends agains bugs from re-seeding the db
    // creates a new cart or returns the currently active cart
    const [cart, shouldClearCookie] = await syncCartAndCookie(req);

    await cart.addItem(id, quantity);
    const updatedCart = await Cart.findOne({
      where: {
        id: req.cart_id,
      },
      include: [Product],
    });
    console.log(chalk.cyan('Product Added'));

    const oneYear = 1000 * 60 * 60 * 24 * 365;


    if (shouldClearCookie) {
      res.clearCookie('cart_id')
        .cookie('cart_id', updatedCart.id, {
          path: '/',
          expires: new Date(Date.now() + oneYear),
        })
        .send(updatedCart)
    } else {
      res.send(updatedCart);
    }

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

cartRouter.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.query;

  try {
    const productCart = await ProductCart.findOne({
      where: {
        cartId: req.cart_id,
        productId: id
      }
    });

    await productCart.update({ quantity });
    const updatedCart = await Cart.findOne({
      where: {
        id: req.cart_id,
      },
      include: [Product],
    });
    await updatedCart.updateTotal();
    console.log(chalk.cyan('Product Quantity Changed'));
    res.send(updatedCart);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})

cartRouter.put('/updateCart/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({ where: { id } })
    cart.completed = true;
    const { completed } = cart
    await Cart.update({ completed }, { where: { id } })

    res.clearCookie("cart_id");
    const newCart = await Cart.create();

    const oneYear = 1000 * 60 * 60 * 24 * 365;

    res.cookie("cart_id", newCart.id, {
      path: "/",
      expires: new Date(Date.now() + oneYear),
    });

    req.cart_id = newCart.id;

    await newCart.setUser(req.user);

    res.sendStatus(200)
  }
  catch (err) {
    console.log(err)
  }
})

cartRouter.get('/get', async (req, res) => {
  try {
    let cart;
    cart = await Cart.findOne({
      where: {
        id: req.cart_id
      },
      include: [Product]
    });
    if (!cart) {
      cart = {
        products: []
      }
    }
    res.send(cart)
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

cartRouter.get('/get/carts', async (req, res) => {
  try {
    const carts = await Cart.findAll({
      where: {
        UserId: req.user.id
      },
      include: [Product]
    });
    res.send(carts)
  }
  catch (err) {
    console.log(err)
  }
})

cartRouter.delete('/remove/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByPk(req.cart_id);

    await cart.deleteProduct(id);
    const updatedCart = await Cart.findOne({
      where: {
        id: req.cart_id
      },
      include: [Product]
    });
    res.send(updatedCart);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})


module.exports = {
  url: '/cart',
  router: cartRouter
}