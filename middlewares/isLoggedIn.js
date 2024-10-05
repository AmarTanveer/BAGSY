const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  // Check for token
  if (!req.cookies.token) {
    req.flash("error", "You need to login first");
    return res.redirect("/"); // Ensure this is the only response sent here
  }

  try {
    // Verify token
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    
    // Fetch user without password
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    // Check if user was found
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/"); // Ensure this is the only response sent here
    }

    // Attach user to request object
    req.user = user;
    res.locals.isUserLoggedIn = true;
    
    // Proceed to next middleware
    next();
  } catch (err) {
    // Handle verification errors
    console.error(err); // Log error for debugging
    req.flash("error", "Something went wrong");
    return res.redirect("/"); // Ensure this is the only response sent here
  }
};
