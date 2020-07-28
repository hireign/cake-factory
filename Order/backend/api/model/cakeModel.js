module.exports = (sequelize, Sequelize) => {
    const Cake = sequelize.define("cake", {
        cake_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        cake_name: {
            type: Sequelize.STRING
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
        tableName: 'cake'
    });
    return Cake;
};
