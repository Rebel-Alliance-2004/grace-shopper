const { Router } = require('express');
const { Review, User } = require('../db/models')


const reviewRouter = Router()

reviewRouter.post('/', async (req, res) => {
  try {
    const { productId, starRating, reviewTitle, reviewText } = req.body;
    const UserId = req.user.id
    const review = await Review.create({
      UserId, productId, starRating, reviewTitle, reviewText
    });
    res.send(review);
  } catch (e) {
    console.log(e)
  }
});

reviewRouter.get("/", async (req, res) => {
  try {
    const reviews = await Review.findAll(
      {
        include: [User]
      }
    );
    res.send(reviews);
  } catch (e) {
    console.log(e)
  }
});

module.exports = {
  url: '/reviews',
  router: reviewRouter
};
