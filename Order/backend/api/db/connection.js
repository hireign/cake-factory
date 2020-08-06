const Sequelize = require("sequelize");
const config = require("./config.js");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    logging: false,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cake = require("../model/cakeModel")(sequelize, Sequelize);
db.order = require("../model/orderModel")(sequelize, Sequelize);

module.exports = db;
