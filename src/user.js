const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    name: String,
    postCount: Number
});

const User = mongoose.model("user", UserSchema); // Create new user model. Mongoose asks mongo if it has a collection of user model instances, if not, it creates it.
// The "User" here represents the entire collection of data. sdfsf

module.exports = {
    User
}