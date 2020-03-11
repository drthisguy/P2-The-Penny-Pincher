module.exports = function (sequelize, DataTypes) {
    const Category = sequelize.define('Category', {
        category: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
    });
    return Category;
};