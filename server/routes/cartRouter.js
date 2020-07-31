const { Router } = require("express");

const cartRouter = Router();
const chalk = require('chalk');

const { Cart, Product } = require('../db/models/index');

cartRouter.post('/add/:id', async (req, res) => {
  try {
    const { quantity } = req.query;
    const { id } = req.params;
    const cart = await Cart.findByPk(req.cart_id);
    await cart.addItem(id, quantity);
    const updatedCart = await Cart.findOne({
      where: {
        id: req.cart_id,
      },
      include: [Product],
    });
    console.log(chalk.cyan('Product Added'));
    res.send(updatedCart);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

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
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

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