function isAuthenticated(req, res, next) {
    if (!req.session.doctorId) {
        req.flash("error", "Please log in first");
        return res.redirect("/login");
    }
    next();
}

module.exports = {
    isAuthenticated
};