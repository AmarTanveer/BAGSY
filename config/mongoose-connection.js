const mongoose = require("mongoose");
const config = require("config");

mongoose
  .connect(`${config.get("MONGODB_URI")}/bagsy`)
  .then(function () {
    console.log("Mongoose Connected");
  })
  .catch(function (err) {
    console.log(err);
  });

module.exports = mongoose.connection;
