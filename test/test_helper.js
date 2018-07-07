const mongoose = require("mongoose");
// This file runs before the rest of the test files because Mocha finds the before function.
mongoose.promise = global.promise // Set global promises

const { User } = require("../src/user")

before((done) => {

    const mongoose = require("mongoose");

    mongoose.connect("mongodb://localhost/users_test")
    mongoose.connection
        .once("open", () => { // Event handler for open event emitter.
            console.log("connected!")
            done();
        })
        .on("error", (err) => console.warn("error", err)); // Event handler for open error.
});

beforeEach(done => { // Before each test.
    const { users, comments, blogposts } = mongoose.connection.collections;
    // Each represents a collection in our database. MONGOOSE NORMALIZES THE NAME, so that blogPosts === blogposts;

    users.drop(() => { // Cannot drop multiple collections at the same time.
      comments.drop(() => {
        blogposts.drop(() => {
          done();
        });
      });
    });
});