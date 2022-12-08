const Auth = {
    checkLogin: ( req, res, next ) => {
        if( !req.session.login ) {
            return res.redirect('/login')
        }
        next();
    },
    
    afterLogin: ( req, res, next ) => {
        let user = req.session.login
        if( user ) {
            res.render(`404`)
        }
        next();
    }
    ,
    isAdmin: ( req, res, next ) => {
        if( !req.session.admin ) {
            return res.redirect('/')
        }
        next();
    }
}

module.exports = Auth