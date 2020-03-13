module.exports = function (sequelize, DataTypes) {
    const Category = sequelize.define('Category', {
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    });
    return Category;
};