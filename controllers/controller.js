const { User, Category, Date, Post } = require("../models");
const bcrypt = require('bcryptjs')
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

  static getLogin( req, res ) {
    let err = req.query.err
    let sess = req.session.login
    if( sess ) {
      res.redirect('/')
    } else {
      res.render('login', { err })
    }
  }

  static postLogin( req, res ) {
    const { user, pass } = req.body
    User.findOne({
      where: {
        name: user
      }
    })
    .then( data => {
        console.log( data.password )
        let validLogin = bcrypt.compareSync( pass, data.password )
        if ( validLogin ) {
          req.session.login = user
          res.redirect(`/`)
        }
        else {
          const error = "invalid email or password"
          res.redirect(`/login?err=${error}`)
        }
    })
    .catch( err => {
      console.log( err )
    })

  }

  static getRegister( req, res ) {
    res.render('register')
  }

  static postRegister( req, res ) {
    const { name, email, password, image, bio } = req.body
    // let pass = encrypt(password)
    // console.log(pass)
    User.create({
      name: name,
      email: email,
      password: password,
      img: image,
      bio: bio
    })
    .then( (_) => res.redirect('/'))
    .catch( err => {
      console.log( err )
      res.send( err )
    })
  }
}

module.exports = Controller;
