const { User, Category, Date, Post } = require("../models");

class Controller {
  static home(req, res) {
    res.render("home");
  }
  static renderTransactions(req, res) {
    res.render("home");
  }
  static renderCategory(req, res) {
    Category.findAll({})
      .then((result) => {
        res.render("CatHome");
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static renderDate(req, res) {
    res.render("dateHome");
  }
  static addPost(req, res) {
    const { userId } = req.params;
    let result;
    Category.findAll()
      .then((data) => {
        result = data;
        User.find;
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static postAdd(req, res) {
    const {} = req.body;
  }
  static login(req, res) {
    const {} = req.body;
  }
  static register(req, res) {
    const {} = req.body;
  }
}

module.exports = Controller;
