const { Router } = require("express");
const { Op } = require("sequelize");
const { Product } = require("../db/models/index");


const searchRouter = Router();

searchRouter.get('/', async (req, res) => {
  const { term } = req.query;
  const results = await Product.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.iRegexp]: term
          }
        },
        {
          description: {
            [Op.iRegexp]: term
          }
        }
      ]
    }
  })
  res.send(results);
});

module.exports = {
  url: '/search',
  router: searchRouter
}