const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const cookieParser = require("cookie-parser");
const ownerModel = require("../models/owner-model");

module.exports.registerUser = async function (req, res) {
  try {
    const { fullname, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(500).send("User with the email already exists");
    }

    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return res.status(500).send(err.message);
      }
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.status(500).send(err.message);
        }
        const createdUser = await userModel.create({
          fullname,
          email,
          password: hash,
        });

        return res.redirect("/");
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.loginUser = async function (req, res) {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await userModel.findOne({ email: email });
    
    // If user not found, redirect with error message
    if (!user) {
      req.flash("error", "Email or Password is incorrect");
      return res.redirect("/"); 
    }

    // Compare password with hashed password in the database
    const result = await bcrypt.compare(password, user.password);
    
    // If password doesn't match, redirect with error message
    if (!result) {
      req.flash("error", "Email or Password is incorrect");
      return res.redirect("/"); 
    }

    // Generate JWT token for the user
    const token = generateToken(user);
    res.cookie("token", token); // Set the token in cookies

    // Redirect to the shop page after successful login
    return res.redirect("/shop"); 
  } catch (error) {
    console.error(error); // Log the error for debugging
    req.flash("error", "Something went wrong. Please try again.");
    return res.redirect("/"); // Redirect on error
  }
};
module.exports.loginAdmin = async function (req, res) {
  const {email, password} = req.body;

  let admin = await ownerModel.findOne({ email: email, password: password});
  if (!admin) {
    req.flash("error", "Email or Password is incorrect");
    res.status(500).send("Wrong email or password");
    return res.redirect("/owners");
  }

  const result = bcrypt.compare(password, admin.password);
  if (!result) {
    req.flash("error", "Email or Password is incorrect");
    res.status(500).send("Wrong email or password");
    return res.redirect("/");
  }

  const token = generateToken(admin);
  res.cookie("token", token);
  return res.redirect("/owners/admin")
}
