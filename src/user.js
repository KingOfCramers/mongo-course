const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String
});

const UserSchema = new Schema ({
    name: {
        type: String,
        required: 'Name is required.', // Assumes true, gives message.
        validate: {
            validator: (name) => name.length > 1, // Must return true.
            message: "Name must be longer than one character."
        }
    },
    postCount: Number,
    posts: [PostSchema] // Mongoose automatically infers this is a list of subdocuments.
});


const User = mongoose.model("user", UserSchema); // Create new user model. Mongoose asks mongo if it has a collection of user model instances, if not, it creates it.
// The "User" here represents the entire collection of data. sdfsf

module.exports = {
    User
}