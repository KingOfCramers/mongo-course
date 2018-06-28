const assert = require("assert");
const { User } = require("../src/user");

describe("Creating records", () => {
    it("Saves a user", (done) => {
        const joe = new User({
            name: "Joe"
        });
        joe.save()
            .then(() => {
                // The .isNew property is false if the instance has been saved to the database.
                assert(!joe.isNew);
                done();
            })
    });
});

