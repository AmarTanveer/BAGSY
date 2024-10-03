const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken");
const cookieParser = require("cookie-parser");

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
        return res.status(200).send(createdUser);
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.loginUser = async function (req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(500).send("Wrong email or password");
  }
  const result = await bcrypt.compare(password, user.password);
  
  if (!result) {
    return res.status(500).send("Wrong email or password");
  } 
  
  const token = generateToken(user);
  res.cookie("token", token);
  return res.status(200).send({ message: "Login successful", token });
};
