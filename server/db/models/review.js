const { UUID, UUIDV4, INTEGER, STRING } = require('sequelize');
const { db } = require('../db');

const Review = db.define('Review', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  starRating: {
    type: INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    },
    allowNull: false,
  },
  reviewTitle: {
    type: STRING,
    allowNull: false,
  },
  reviewText: {
    type: STRING,
    allowNull: false,
  }
})

module.exports = Review 