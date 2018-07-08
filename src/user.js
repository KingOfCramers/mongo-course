const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Avoid cyclic reloads!! const BlogPost = require("blogpost");

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


/// RELEVANT FOR MIDDLEWARE TEST
UserSchema.pre('remove', function(next) { // Move to the next middleware or, otherwise remove the record from the database
    // pull another model out of mongoose that has already been registered
    const BlogPost = mongoose.model('blogpost'); // GETTER for monogoose blogpost model

    // this === joe
    // We want to remove all blogposts associated with the user...
        // But they are an array of Ids, so we have to do something special.

        // similar to the UPDATE operator, We're using a query operator
        BlogPost.remove({ _id: { $in: this.blogposts }})
            .then(() => {
                next();
            }) // Using the model, not the instance, remove any document that has an _id: value that is $in this.blogposts (which is an array of ids stored in the User schema).
});


const User = mongoose.model("user", UserSchema); // Create new user model. Mongoose asks mongo if it has a collection of user model instances, if not, it creates it.


module.exports = {
    User
}