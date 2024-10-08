const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  image: Buffer,
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
  discount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("product", productSchema);
