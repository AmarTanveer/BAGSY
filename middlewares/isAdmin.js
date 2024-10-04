const ownerModel = require("../models/owner-model");
const jwt = require("jsonwebtoken");


module.exports = async function(req, res, next) {
    if (!req.cookies.token) {
        req.flash("error", "You need to login first");
        return res.redirect("/");
      }
    
      try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let admin = await ownerModel
          .findOne({ email: decoded.email })
          .select("-password");
    
        req.admin = admin;
        res.locals.isAdminLoggedIn = true;
        next();
      } catch (err) {
        req.flash("error", "Something went wrong");
        return res.redirect("/");
      }
}