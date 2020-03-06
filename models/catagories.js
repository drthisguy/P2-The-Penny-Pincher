module.exports = function(sequelize, DataTypes) {
    const Catagory = sequelize.define("Catagory", {
      category: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Miscellaneous",
      },
      priority: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "Medium",
      },
    });
    return Catagory;
  };
  