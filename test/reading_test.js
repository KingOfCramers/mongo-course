const assert = require("assert");
const { User } = require("../src/user");

describe("Reading users out of the database", () => {
    let joe,alex,tim,sam;

    beforeEach((done) => { // Insert a record to search for!
        alex = new User({ name: "Alex" });
        joe = new User({ name: "Joe" });
        sam = new User({ name: "Sam" });
        tim = new User({ name: "Tim" });

        Promise.all([joe.save(),alex.save(),tim.save(),sam.save()])
            .then(() => done());
    });

    it("Finds all users with a name of joe", (done) => {
        User.find({ name: "Joe" })
            .then((users) => {
                assert(users[0]._id.toString() === joe._id.toString())
                done();
            })
    });

    it("find a user with a particular id", (done) => {
        User.findOne({ _id: joe._id })
            .then((user) => {
                assert(user.name === "Joe");
                done();
            });
    });

    it("skips and limits the output", (done) => {
        User.find()
        .sort({ name: 1 }) // Sort by name, ascending order (this is necessary because they may not load sequentially)
        .skip(1) // Skip Alex
        .limit(2) // Only get Joe and Sam
        .then((users) => {
            assert(users[0].name === joe.name)
            assert(users[1].name === sam.name)
            done();
        })
    })
});