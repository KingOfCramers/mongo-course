const mongoose = require("mongoose");
const assert = require("assert");
const { User } = require("../src/user");
const { BlogPost } = require("../src/blogpost");

describe("Middleware", () => {
  let joe, blogpost;

  beforeEach((done) => {
    // Create a user and a blogpost, so that we can test our pre-removal middleware, which should remove the "hanging" blogpost associated with the user when they are deleted.

    joe = new User({ name: "Joe"});
    blogpost = new BlogPost({ title: "JS is great", content: "Yep it is!"});
    joe.blogposts.push(blogpost);

    // Persist to MongoDB database;
    Promise.all([joe.save(), blogpost.save() ])
      .then(() => done());
  });


  it("users clean up dangling blogposts on remove", (done) => {
    joe.remove() // This will trigger the userschema pre-remove middleware.
      .then(() => BlogPost.count()) // Total # of documents in the database
      .then((blogpost_count) => {
        assert(blogpost_count === 0);
        done();
      });
  });
});