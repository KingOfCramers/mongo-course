const assert = require("assert");
const { User } = require("../src/user");

describe("Updating records", () => {

    let joe;

    beforeEach((done) => { // Comes from mocha. Run before each test.
        joe = new User({ name: "Joe", postCount: 0});
        joe.save()
            .then(() => done())
    });

    // Helper function. Takes a promise, which resolves with users array that we can check.
    function assertName(operation, done){
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name ===  "Harry");
                done();
            })
            .catch((e) => console.log(e));
    }


/// INSTANCE UPDATES
    it("Instance type using set and save", (done) => {
        joe.set("name", "Harry"); // Done in RAM, does not save to db.
        assertName(joe.save(), done); // The save here is the final operation.
    });

    it("A model instance can update", (done) => {
        assertName(joe.update({ name: "Harry"}), done); // In update, the save is included.
    });

/// CLASS UPDATES
    it("A model class update multiple", (done) => {
        // Update finds any records that match, then changes them + saves.
        assertName(
            User.update({name : "Joe"}, { name: "Harry"}),
            done
        )
    });

    // Updates the first match...
    it("A model class update one record", (done) => {
        assertName(
            User.findOneAndUpdate({name : "Joe"}, { name: "Harry"}),
            done
        )
    });

    it("A model class update one record", (done) => {
        assertName(
            User.findByIdAndUpdate(joe._id, { name: "Harry"}),
            done
        )
    });

// UPDATE OPERATORS
    /// Update operators
    it("Model class increment postcount by 1", () => {
        User.update({name: "Joe"}, { $inc: {posCount: 1} });
    })
});