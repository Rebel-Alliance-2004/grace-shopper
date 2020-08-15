const { Router } = require("express");
const { createIntent } = require('../stripe/stripe');
const { Cart } = require('../db/models/index');

const checkoutRouter = Router();

checkoutRouter.get('/secret/:id', async (req, res) => {
  const { id } = req.params;
  const cart = await Cart.findByPk(id)

  const intent = await createIntent(cart.total*100)
  res.send({client_secret: intent.client_secret});
});

module.exports = {
  url: '/checkout',
  router: checkoutRouter
}
