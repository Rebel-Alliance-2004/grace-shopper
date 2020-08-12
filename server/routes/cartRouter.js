const { Router } = require("express");

const cartRouter = Router();
const chalk = require('chalk');

const { Cart, Product, ProductCart } = require('../db/models/index');

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

cartRouter.put('/updateCart/:id', async (req, res)=>{
  try{
    const { id } =req.params;
    const cart = await Cart.findOne({where: {id}})
    cart.completed=true;
    const { completed } = cart
    await Cart.update({completed}, { where: { id } })
    res.send(cart)
  }
  catch (err){
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

cartRouter.get('/get/carts', async (req, res)=>{
  try {
    const carts = await Cart.findAll({
      where: {
        UserId: req.user.id
      },
      include: [Product]
    });
    res.send(carts)
  }
  catch (err){
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