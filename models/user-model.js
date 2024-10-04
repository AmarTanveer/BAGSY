const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: { type: String, trim: true, required: true, minLength: 3 },
  email: String,
  password: String,
  contact: Number,
  picture: String,
  isadmin: Boolean,
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:  "product"
  }],
  orders: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("user", userSchema);
