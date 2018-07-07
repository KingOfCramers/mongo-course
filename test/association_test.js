// Import all models into test file.
const mongoose = require("mongoose");
const { User } = require("../src/user");
const { Comment } = require("../src/comment");
const { BlogPost } = require("../src/blogpost");
const assert = require("assert");

describe("Associations test", () => {
  let joe, blogpost, comment; // Define instances in scope for all tests

beforeEach((done) => {
  // Create instances;
  joe = new User({ name: "Joe"});
  blogpost = new BlogPost({ title: "JS is great", content: "Yep it is!"});
  comment = new Comment({ content: "Congrats on the great post!" });

  // Create the user on Node;
  // The model for each document in the blogposts array is an "objectID." Mongoose therefore knows to simply create an objectId and reference the actual blogpost from the blogpost collection.
  joe.blogposts.push(blogpost);

  // Again, comments is an array on the blogpost model of ObjectIds
  blogpost.comments.push(comment);
  comment.user = joe; // The user property on the comment instance is NOT an array, therefore we simply assign it to the joe instance. It's still a reference, but only a singular one.

  // Persist to MongoDB database;
  Promise.all([
    joe.save(),
    blogpost.save(),
    comment.save()
  ]).then(() => done());
});

it("Saves a relation between a user and a blogpost", (done) => {
  User.findOne({ name: "Joe"})
    .populate("blogposts") // the blogposts property, using the objectIDs.
    // KEEP IN MIND, this doesn't recursively populate the references on blogposts, that must be done explicitly (this is to avoid crashing highly relational databases).
    .then((user)=> {
      assert(user.blogposts[0].title === "JS is great")
      done();
    });
});

it("saves a full relational tree", (done) => {
  User.findOne({name: "Joe" })
    .populate({
      path: 'blogposts', // populate the blogposts property
      populate: { // Go inside that each new blogpost object...
        path: 'comments', // to the comments property...
        model: 'comment', // And load in using the comment model + objectId
        populate: {
          path: 'user', // populate the user path
          model: 'user' // using the user model
        }
      }
    }).then((user) => {

      // Now we can do very specific searches....
      // Log the name of the user that made the first comment on the first blogpost from the user returned.
      console.log(user.blogposts[0].comments[0].user.name);




      done();
    }).catch((e) => {
      done(e)
    }) // Can also take an object with configurations.
});

});