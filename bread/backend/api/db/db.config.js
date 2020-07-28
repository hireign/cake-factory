module.exports = {
    HOST: "database-1.cb8otgwpoa6u.us-east-1.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "admin123",
    DB: "breadDB",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };