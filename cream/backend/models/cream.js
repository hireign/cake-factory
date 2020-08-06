module.exports = (sequelize, Sequelize) => {
  const Cream = sequelize.define(
    "cream",
    {
      cream_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
      },
      cream_type: {
        type: Sequelize.STRING,
        unique: true,
      },
      qty: {
        type: Sequelize.DECIMAL,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "cream-data",
    }
  );
  return Cream;
};
