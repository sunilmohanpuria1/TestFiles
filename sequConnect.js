const Sequelize = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize(config.mysqldata.database, config.mysqldata.username, config.mysqldata.password, {
    host: config.mysqldata.host,
    dialect: config.mysqldata.dialect
  });

  const my_table = sequelize.define('my_table', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: true
      }, 
    Redis_key: {
      type: Sequelize.STRING
    }
  }, {
    paranoid: true,
  });

  module.exports = {sequelize,my_table};