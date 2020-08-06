module.exports = {
    HOST: "orderdb.cxn06taxia6k.us-east-1.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "rootadmin123",
    DB: "orderDB",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
