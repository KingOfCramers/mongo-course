// Import all models into test file.
const mongoose = require("mongoose");
const { User } = require("../src/user");
const { Comment } = require("../src/comment");
const { BlogPost } = require("../src/blogpost");
const assert = require("assert");

describe("Associations test", () => {
  let joe, blogpost, comment; // Define instances in scope for all tests


  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogpost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
    comment = new Comment({ content: 'Congrats on the great post' });

    joe.blogposts.push(blogpost);
    blogpost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogpost.save(), comment.save()])
      .then(() => done());
  });


it("Saves a relation between a user and a blogpost", (done) => {
  User.findOne({ name: "Joe"})
    .populate("blogposts") // the blogposts property, using the objectIDs.
    // KEEP IN MIND, this doesn't recursively populate the references on blogposts, that must be done explicitly (this is to avoid crashing highly relational databases).
    .then((user)=> {
      assert(user.blogposts[0].title === "JS is Great")
      done();
    });
});

it("saves a full relational tree", (done) => {
  User.findOne({name: "Joe" })
    .populate({ // can also just pass a list of refs...
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

      // Now we can do very specific checks + routes....
      // Log the name of the user that made the first comment on the first blogpost from the user returned.

      assert(user.name === "Joe");
      assert(user.blogposts[0].title == "JS is Great");
      assert(user.blogposts[0].comments[0].content === "Congrats on the great post");

      done();
    }).catch((e) => {
      done(e)
    }) // Can also take an object with configurations.
});

});