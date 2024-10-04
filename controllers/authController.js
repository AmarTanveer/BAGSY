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

  const user = await userModel.findOne({ email: email });
  if (!user) {
    req.flash("error", "Email or Password is incorrect");
    res.status(500).send("Wrong email or password");
    return res.redirect("/");
  }
  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    req.flash("error", "Email or Password is incorrect");
    res.status(500).send("Wrong email or password");
    return res.redirect("/");
  }

  const token = generateToken(user);
  res.cookie("token", token);
  // res.status(200).send({ message: "Login successful", token });
  return res.redirect("/shop");
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
