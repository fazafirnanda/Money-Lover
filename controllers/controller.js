const { User, Category, Date, Post } = require("../models");
const bcrypt = require("bcryptjs");
const convertRupiah = require("../helper/index");
const { Op } = require("sequelize");

class Controller {
  static home(req, res) {
    let { user } = req.session;
    let result;
    if (!user) {
      res.redirect("/login");
    } else {
      let { isLogin, id } = req.session.user;
      Post.findAll({
        where: {
          UserId: user.id,
        },
        include: Category,
      })
        .then((data1) => {
          result = data1;
          return User.findByPk(id);
        })
        .then((data) => {
          res.render("home", { result, isLogin, data, convertRupiah });
        })
        .catch((err) => {
          res.send(err);
        });
    }
  }
  // static renderTransactions(req, res) {

  // }
  static deletePost(req, res) {
    const { postId } = req.params;
    Post.destroy({
      where: {
        id: postId,
      },
    })
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static editPost(req, res) {
    const { postId } = req.params;
    const { error } = req.query;
    let data;
    let date;
    Post.findByPk(postId)
      .then((data1) => {
        date = Post.formatForDate(data1.date);
        data = data1;
        return Category.findAll();
      })
      .then((result) => {
        res.render("editPost", { data, result, date, error });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static postEdit(req, res) {
    const { title, CategoryId, amount, description, date } = req.body;
    console.log(req.body);
    const { postId } = req.params;
    console.log(req.params);
    User.update(
      { title, CategoryId: +CategoryId, amount: +amount, description, date },
      {
        where: {
          id: +postId,
        },
      }
    )
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        if (err.name == "SequelizeValidationError") {
          let errors = err.errors.map((el) => {
            return el.message;
          });
          res.redirect(`/edit/${postId}?error=${errors}`);
        } else {
          res.send(err);
        }
      });
  }

  static renderCategory(req, res) {
    const { id } = req.session.user;
    let result;
    const { title } = req.query;
    let options = {
      include: {
        model: Post,
        where: {
          UserId: id,
        },
      },
      where: {},
    };
    if (title) {
      options.where.title = { [Op.iLike]: `%${title}%` };
    }
    Category.findAll(options)
      .then((data) => {
        result = data;
        return User.findByPk(id);
      })
      .then((data) => {
        res.render("CatHome", { result, convertRupiah, data });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static renderDate(req, res) {
    const { id } = req.session.user;
    let result;
    Post.findAll({
      where: {
        UserId: id,
      },
      include: Category,
      order: [["date", "DESC"]],
    })
      .then((data) => {
        result = data;
        return User.findByPk(id);
      })
      .then((data) => {
        res.render("dateHome", { result, data, convertRupiah });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static addPost(req, res) {
    const { id } = req.session.user;
    const { error } = req.query;
    let result;
    Category.findAll()
      .then((data) => {
        result = data;
        return User.findByPk(id);
      })
      .then((data) => {
        res.render("add", { result, data, convertRupiah, error });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static postAdd(req, res) {
    const { title, description, CategoryId, date, amount } = req.body;
    const UserId = req.session.user.id;
    Post.create({ title, description, CategoryId, date, amount, UserId })
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        if (err.name == "SequelizeValidationError") {
          let errors = err.errors.map((el) => {
            return el.message;
          });
          res.redirect(`/addPost?error=${errors}`);
        } else {
          res.send(err);
        }
      });
  }

  static getLogin(req, res) {
    let err = req.query.err;
    let { user } = req.session;
    if (user) {
      res.redirect("/");
    } else {
    }
    res.render("login", { err });
  }

  static postLogin(req, res) {
    const { user, pass } = req.body;
    User.findOne({
      where: {
        name: user,
      },
    })
      .then((data) => {
        let validLogin = bcrypt.compareSync(pass, data.password);
        if (validLogin) {
          req.session.user = {
            id: data.id,
            name: data.name,
            email: data.email,
            isLogin: true,
          };
          res.redirect(`/`);
        } else {
          const error = "invalid email or password";
          res.redirect(`/login?err=${error}`);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static getRegister(req, res) {
    res.render("register");
  }

  static postRegister(req, res) {
    const { name, email, password, image, bio } = req.body;
    // let pass = encrypt(password)
    // console.log(pass)
    User.create({
      name: name,
      email: email,
      password: password,
      img: image,
      bio: bio,
    })
      .then((_) => res.redirect("/"))
      .catch((err) => {
        res.send(err);
      });
  }
  static logout(req, res) {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  }
}

module.exports = Controller;
