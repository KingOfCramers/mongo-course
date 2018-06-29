const assert = require("assert");
const { User } = require("../src/user");

describe("Validating records", () => {
    it("Requires a username", (done) => {
        // New user, w/ problematic information.
        const unnamed = new User({name: undefined, postCount: 0});

        // Validationresult is an object with all of our validation data.
        const validationResult = unnamed.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === "Name is required.")

        done();
    });
    it("Requires a username longer than one character", (done) => {
        // New user, w/ problematic information.
        const badName = new User({name: "B", postCount: 0});

        const validationResult = badName.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === "Name must be longer than one character.")

        done();
    });
    it("Disallows invalid records from being saved", () => {
        const badName = new User({ name: "B", postCount: 0});
        badName.save()
            .catch((validationResult) => {
                // From user model.
                const { message } = validationResult.errors.name;
                assert(message === "Name must be longer than one character.")
            });
    });
});