const mongoose = require("mongoose");
const config = require("config");

mongoose
  .connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.87p73.mongodb.net/bagsy`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log("Mongoose Connected");
  })
  .catch(function (err) {
    console.log(err);
  });

module.exports = mongoose.connection;
