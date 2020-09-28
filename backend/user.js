const mongoose = require("mongoose");
const user = new mongoose.Schema({
    fullname:String,
    username: String,
    password: String,
    email: String,
    DateCreated: Date,
    verified: Boolean

});
module.exports = mongoose.model("User", user);