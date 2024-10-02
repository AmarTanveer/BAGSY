const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/bagsy");

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    contact: Number,
    picture: String,
    isadmin: Boolean,
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("user", userSchema);