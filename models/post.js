"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User);
      Post.belongsTo(models.Category);
    }
    static formatForDate(date) {
      return date.toLocaleDateString("en-CA");
    }

    formatDate() {
      return this.date.toLocaleDateString("id");
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Title Harus Diisi",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Deskripsi Harus Diisi",
          },
        },
      },
      UserId: DataTypes.INTEGER,
      CategoryId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Nama Kategori Harus Diisi",
          },
        },
      },
      amount: DataTypes.INTEGER,
      date: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            msg: "Tanggal Harus Diisi",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  // Post.beforeCreate((intances) => {
  //   intances.amount = 0;
  // });

  return Post;
};
