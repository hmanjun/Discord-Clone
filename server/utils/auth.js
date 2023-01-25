const withAuth = (req,res,next) => {
    if(!req.session.logged_in) {
        res.redirect('http://localhost:3000/login')
    } else {
        next()
    }
}

module.exports = withAuth