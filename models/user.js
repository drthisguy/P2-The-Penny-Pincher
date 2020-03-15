//password hashing.
const bcrypt = require("bcryptjs");

// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  //validate password format
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  //hook added for hashing pw at creation
  User.addHook("beforeCreate", user => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
