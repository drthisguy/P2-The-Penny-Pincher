
module.exports = function(sequelize, DataTypes) {
    
    const Expense = sequelize.define("Expense", {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Miscellaneous",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Miscellaneous",
      },
      priority: {
        type: DataTypes.ENUM,
        values: ["Low", "Medium", "High"],
        defaultValue: "Medium",
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      }
    });
    return Expense;
  };