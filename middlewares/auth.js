function auth(req, res, next) {
    if(req.session.user) {
        next()
    }else {
        console.log("redirigé vers login")
        res.redirect("/login")
    }
 }
module.exports = auth