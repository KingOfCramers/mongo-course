const assert = require("assert");
const { User } = require("../src/user");

describe("Subdocuments", () => {
    it("Can create a subdocument", (done) => {
        const joe = new User({
            name: "joe",
            posts: [{title: "Fake Title"}, {title: "Fake Title 2"}]
        });

        joe.save()
            .then(() => User.findOne({ name: "joe"}))
            .then((user) => {
                assert(user.posts[0].title === "Fake Title");
                done();
            });
    });

    it("Can add subdocuments to an existing record", (done) => {

        const joe = new User({
            name: "joe",
            posts: []
        });

        joe.save()
            .then(() => User.findOne({name: "joe"}))
            .then((user) => {
                user.posts.push({ title: "New Post" });
                return user.save(); // To trigger next promise
            })
            .then(() => User.findOne({name: "joe"}))
            .then((user) => {
                assert(user.posts[0].title == "New Post")
                done();
            });
    });

    it("Can remove an existing subdocument", (done) => {
        const joe = new User({
            name: "joe",
            posts: [{title: "Fake title"}]
        });

        joe.save()
            .then(() => User.findOne({ name: "joe"}))
            .then((user) => {
                user.posts[0].remove(); // Unlike removing a document (like joe.remove) removing a nested subdocument does not automatically communicate with our database, we still have to call save on the parent record.
                return user.save();
            })
            .then(() => User.findOne({ name: "joe"}))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            })
    })
});