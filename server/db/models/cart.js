/* eslint-disable func-names */
const { UUID, UUIDV4, DECIMAL, BOOLEAN } = require('sequelize');
const { db } = require('../db');

const Product = require('./product');
const ProductCart = require('./product-cart');

const Cart = db.define('cart', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  total: {
    type: DECIMAL,
    defaultValue: 0
  },
  completed: {
    type: BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
});

Cart.prototype.addItem = async function (productId, quantity) {
  const addedProduct = await Product.findOne({ where: { id: productId } });
  let productCart = await ProductCart.findOne({
    where: {
      productId,
      cartId: this.id
    }
  });
  if (productCart) {
    const newQuantity = productCart.quantity + +quantity
    await productCart.update({
      quantity: newQuantity
    });
  } else {
    productCart = await ProductCart.create({
      productId: addedProduct.id,
      cartId: this.id,
      quantity
    })
  }
  await this.addToTotal(productId, quantity);
}

Cart.prototype.addToTotal = async function (id, qty) {
  const product = await Product.findOne({ where: { id } });
  const newTotal = await +this.total + (+product.price * +qty);
  await this.update({ total: newTotal });
}

Cart.prototype.deleteProduct = async function (productId) {
  const deletedProduct = await ProductCart.findOne({
    where: {
      productId,
      cartId: this.id
    }
  });
  await deletedProduct.destroy();
  await this.updateTotal();
}

Cart.prototype.updateTotal = async function () {
  const products = await ProductCart.findAll({ where: { cartId: this.id } });
  const total = await products.reduce(async (accum, currentProduct) => {
    const product = await Product.findByPk(currentProduct.productId);
    return await accum + +product.price * +currentProduct.quantity
  }, 0)
  await this.update({ total });
}

module.exports = Cart;