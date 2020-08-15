const { Router } = require("express");
const { adminApiSecurityCheck, accessDeniedResponse } = require('../utils')



const apiRouter = Router();

const { Product, Category } = require("../db/models/index");


apiRouter.get("/products", async (req, res) => {
  const products = await Product.findAll();
  res.status(200).send(products);
});

apiRouter.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  res.status(200).send(product);
});

apiRouter.get("/categories", async (req, res) => {
  const categories = await Category.findAll();
  res.status(200).send(categories);
});

apiRouter.post("/products", async (req, res) => {
  try {
    adminApiSecurityCheck(req);
    const { price, name, description, categoryId, imgSrcLg, imgSrcSm } = req.body;
    const createdProduct = await Product.create({
      price,
      name,
      description,
      categoryId,
      imgSrcLg,
      imgSrcSm
    })
    res.status(201).send({
      product: createdProduct,
      message: `Product ${name} created sucessfully`
    });
  } catch (err) {
    console.log(err)
    accessDeniedResponse(err, res);
  }
})

apiRouter.post("/categories", async (req, res) => {
  try {
    adminApiSecurityCheck(req);
    const { name } = req.body;
    const createdCategory = await Category.create({ name })
    res.status(201).send({
      category: createdCategory,
      message: `Category ${name} created sucessfully`
    })
  } catch (err) {
    accessDeniedResponse(err, res);
  }
})

apiRouter.put('/products/:id', async (req, res) => {
  try {
    adminApiSecurityCheck(req);
    const { price, name, description, categoryId, id } = req.body
    await Product.update({ price, name, description, categoryId }, { where: { id } })
    const products = await Product.findAll()
    res.send(products);
  } catch (err) {
    accessDeniedResponse(err, res);
  }
})

apiRouter.put('/categories/:id', async (req, res) => {
  try {
    adminApiSecurityCheck(req);
    const { name, id } = req.body
    await Category.update({ name }, { where: { id } })
    const categories = await Category.findAll()
    res.send(categories);
  } catch (err) {
    accessDeniedResponse(err, res);
  }
})

apiRouter.delete('/categories/:id', async (req, res) => {
  try {
    adminApiSecurityCheck(req);
    const deletedCat = await Category.findByPk(req.params.id)
    await deletedCat.destroy()
    await Product.destroy({ where: { categoryId: null } })

    const products = await Product.findAll();
    const categories = await Category.findAll();
    res.send({ products, categories });
  } catch (err) {
    accessDeniedResponse(err, res);
  }
})

apiRouter.delete('/products/:id', async (req, res) => {
  try {
    adminApiSecurityCheck(req);
    const deletedProd = await Product.findByPk(req.params.id)
    await deletedProd.destroy()
    const products = await Product.findAll()
    res.send(products);
  } catch (err) {
    accessDeniedResponse(err, res);
  }
})

module.exports = {
  url: '/api',
  router: apiRouter
};
