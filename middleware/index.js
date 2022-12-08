const Auth = {
  checkLogin: (req, res, next) => {
    if (!req.session.user) {
      res.redirect("/login");
    }
    next();
  },

  afterLogin: (req, res, next) => {
    let user = req.session.user;
    if (!user) {
      next();
    }
    // next();
    // res.render("");
  },
  isAdmin: (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/");
    }
    next();
  },
};

module.exports = Auth;
