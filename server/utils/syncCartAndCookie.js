const { Cart } = require('../db/models');

const syncCartAndCookie = async (req) => {
  // defends against bugs from re-seeding db
  // then cookies don't match
  let shouldClearCookie = false;
  let cart = await Cart.findByPk(req.cart_id);
  if (!cart) {
    cart = await Cart.create();

    req.cart_id = cart.id;
    shouldClearCookie = true;
  }
  return [cart, shouldClearCookie];
}

module.exports = syncCartAndCookie;