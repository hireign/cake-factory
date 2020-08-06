const Sequelize = require("sequelize");

const SCHEMA = process.env.DATABASE || "cream";
const DB_USER = process.env.DB_USER || "admin";
const DB_PASSWORD = process.env.DB_PASSWORD || "admin123";
const DB_HOST =
  process.env.DB_HOST ||
  "cloud-proj-cream.cfdflfwonqma.us-east-2.rds.amazonaws.com";

const sequelize = new Sequelize(SCHEMA, DB_USER, DB_PASSWORD, {
  dialect: "mysql",
  host: DB_HOST,
  port: 3306,
  logging: false,
});

const con = {};

con.Sequelize = Sequelize;
con.sequelize = sequelize;

con.cream = require("../models/cream")(sequelize, Sequelize);

module.exports = con;
