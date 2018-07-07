const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    // The comments will be stored as a ray of IDs.
    comments: [{
        type: Schema.Types.ObjectId, // This is an ObjectId of a document...
        ref: "comment" // stored in the comment collection -- must be lowercase
    }]
});

const BlogPost = mongoose.model("blogpost", BlogPostSchema);

module.exports = {
    BlogPost
}