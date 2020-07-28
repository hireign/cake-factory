
module.exports = (sequelize, Sequelize) => {
    const Bread = sequelize.define("bread", {
      bread_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      bread_type: {
        type: Sequelize.STRING
      },
      bread_qty: {
        type: Sequelize.INTEGER
      }
    },{
        timestamps: false,
        freezeTableName: true,
        tableName: 'bread'
    });
    return Bread;
  };