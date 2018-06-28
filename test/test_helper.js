const mongoose = require("mongoose");
// This file runs before the rest of the test files because Mocha finds the before function.
mongoose.promise = global.promise //sdfsdf

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

beforeEach((done) => { // Before each test.
    mongoose.connection.collections.users.drop(); // Equivalent to removing all data from database.
    done();
})