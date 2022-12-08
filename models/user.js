"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post);
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      img: DataTypes.STRING,
      bio: DataTypes.STRING,
      money: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          let hash = bcrypt.hashSync(user.password, 10);
          user.password = hash;
          user.isLogin = false;
          user.money = 0;
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
