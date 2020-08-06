module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        order_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.STRING
        },
        timestamp: {
            type: Sequelize.DATE
        },
        sugar_type: {
            type: Sequelize.STRING
        },
        sugar_qty: {
            type: Sequelize.DECIMAL(10,2)
        },
        bread_type: {
            type: Sequelize.STRING
        },
        bread_qty: {
            type: Sequelize.INTEGER
        },
        cream_type: {
            type: Sequelize.STRING
        },
        cream_qty: {
            type: Sequelize.DECIMAL(10,2)
        }
    },{
        timestamps: false,
        freezeTableName: true,
        tableName: 'order'
    });
    return Order;
};
