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
        bread_type: {
            type: Sequelize.STRING
        },
        cream_type: {
            type: Sequelize.STRING
        },
        cake_url: {
            type: Sequelize.STRING
        }
    },{
        timestamps: false,
        freezeTableName: true,
        tableName: 'cake'
    });
    return Cake;
};
