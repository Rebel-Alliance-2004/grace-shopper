const { UUID, UUIDV4, STRING, DECIMAL, TEXT } = require('sequelize');
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
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imgSrcLg: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imgSrcSm: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
});

module.exports = Product;