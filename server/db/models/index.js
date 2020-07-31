const { User } = require('./user');
const { Session } = require('./session');

Session.belongsTo(User);
User.hasMany(Session);

const ProductCart = require('./product-cart');
const Cart = require('./cart');
const Product = require('./product');
const Category = require('./category');

Product.belongsTo(Category);
Category.hasMany(Product);

Product.belongsToMany(Cart, { through: ProductCart });
Cart.belongsToMany(Product, { through: ProductCart });

User.hasMany(Cart);
Cart.belongsTo(User);

module.exports = {
    User,
    Session,
    ProductCart,
    Cart,
    Product,
    Category
}