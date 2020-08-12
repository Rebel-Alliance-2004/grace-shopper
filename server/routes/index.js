const apiRouter = require('./apiRouter');
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const checkoutRouter = require('./checkoutRouter');
const reviewRouter = require('./reviewRouter');
const searchRouter = require('./searchRouter');


module.exports = [apiRouter, userRouter, cartRouter, checkoutRouter, reviewRouter, searchRouter];

