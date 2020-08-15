const { UUID, UUIDV4, STRING, } = require('sequelize');
const { db } = require('../db');

const Category = db.define('category', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
});

module.exports = Category;