const { UUID, UUIDV4, STRING, DECIMAL } = require('sequelize');
const { db } = require('../db');

const Product = db.define('product', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  price: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Product;