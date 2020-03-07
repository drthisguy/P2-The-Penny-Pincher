module.exports = function(sequelize, DataTypes) {
    
    const Expense = sequelize.define("Expense", {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Miscellaneous",
      },
      catagory_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Catagories",
            key: "id"
        }
      },
      mandatory: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      }
    });
    return Expense;
  };