const dbConfig = require("./db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {

    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

const con = {};

con.Sequelize = Sequelize;
con.sequelize = sequelize;

con.bread = require("../model/bread.model")(sequelize, Sequelize);

module.exports = con;
