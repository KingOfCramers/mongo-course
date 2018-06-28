const assert = require("assert");
const { User } = require("../src/user");

describe("Deleting a user", () => {
    let joe;
    beforeEach((done) => {
        joe = new User({ name: "Joe"})
        joe.save()
            .then(() => done())
    });

    // INSTANCE BASED DELETION
    it("model instance remove", (done) => {
        joe.remove()
            .then(() => User.findOne({name: "Joe"})) // Implicit promise return
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    // CLASS BASED DELETION
    it("class method remove", (done) => {
        User.remove({ name: "Joe" })
            .then(() => User.findOne({name: "Joe"})) // Implicit promise return
            .then((user) => {
                assert(user === null);
                done();
            });
    });
    it("class method findAndRemove", (done) => {
        User.findOneAndRemove({ name: "Joe"})
            .then(() => User.findOne({name: "Joe"})) // Implicit promise return
            .then((user) => {
                assert(user === null);
                done();
            });
    })
    it("class method findByIdAndRemove", (done) => {
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({name: "Joe"})) // Implicit promise return
            .then((user) => {
                assert(user === null);
                done();
            });
    })
});