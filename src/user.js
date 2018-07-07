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
    likes: Number,
    posts: [PostSchema], // Mongoose automatically infers this is a list of subdocuments.
    blogposts: [{ // This has to be an array!!
        type: Schema.Types.ObjectId,
        ref: 'blogpost'
    }]
});

// This "getter" defines a function, which means when we reference user.postCount we're actually computing and returning a value.
UserSchema.virtual("postCount").get(function() {
    return this.posts.length;
});


const User = mongoose.model("user", UserSchema); // Create new user model. Mongoose asks mongo if it has a collection of user model instances, if not, it creates it.

module.exports = {
    User
}