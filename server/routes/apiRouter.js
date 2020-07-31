const { Router } = require("express");

const apiRouter = Router();

const { Product, Category } = require("../db/models/index");

apiRouter.get("/products", async (req, res) => {
  const products = await Product.findAll();
  res.status(200).send(products);
});

apiRouter.get("/categories", async (req, res) => {
  const categories = await Category.findAll();
  res.status(200).send(categories);
});

apiRouter.post("/products", async (req, res) => {
  const { price, name, description, categoryId } = req.body;
  const createdProduct = await Product.create({
    price,
    name,
    description,
    categoryId
  })
  res.status(201).send({
    product: createdProduct,
    message: `Product ${name} created sucessfully`
  })
})

apiRouter.post("/categories", async (req, res) => {
  const { name } = req.body;
  const createdCategory = await Category.create({ name })
  res.status(201).send({
    category: createdCategory,
    message: `Category ${name} created sucessfully`
  })
})

apiRouter.put('/products/:id', async (req, res) => {
  console.log(req.body)
  const { price, name, description, categoryId, id } = req.body
  await Product.update({ price, name, description, categoryId }, { where: { id } })
  const products = await Product.findAll()
  res.send(products);
})

apiRouter.put('/categories/:id', async (req, res) => {
  const { name, id } = req.body
  await Category.update({ name }, { where: { id } })
  const categories = await Category.findAll()
  res.send(categories);
})

apiRouter.delete('/categories/:id', async (req, res) => {
  const deletedCat = await Category.findByPk(req.params.id)
  await deletedCat.destroy()
  await Product.destroy({ where: { categoryId: null } })

  const products = await Product.findAll();
  const categories = await Category.findAll();
  res.send({ products, categories })
})

apiRouter.delete('/products/:id', async (req, res) => {
  const deletedProd = await Product.findByPk(req.params.id)
  await deletedProd.destroy()
  const products = await Product.findAll()
  res.send(products)
})

module.exports = {
  url: '/api',
  router: apiRouter
};
