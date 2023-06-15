/*
    Test the User Management endpoints
*/

const fs = require("fs")
const chai = require("chai")
const chaiHttp = require("chai-http")

const expect = chai.expect
chai.use(chaiHttp)

const path = require('path');
const filename = path.basename(__filename);

const SERVER_URL = "http://localhost:3333"
const ADMIN_EMAIL = "admin@admin.com"
const ADMIN_PASSWORD = "Admin123!"
let ADMIN_TOKEN = ""
let user_id = ""



describe("Log into admin account.", () => {

    before(() => {
        console.log("[Script: " + filename + "]")
    })

    it("Should return 200, and JSON with user_id and session_token of admin.", () => {
        return chai.request(SERVER_URL)
            .post("/login")
            .send({
                "email": ADMIN_EMAIL,
                "password": ADMIN_PASSWORD
            })
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.have.property("user_id")
                expect(res.body).to.have.property("session_token")
                ADMIN_TOKEN = res.body.session_token
            })
            .catch((err) => {
                throw err
            })
    })
})

describe("Return the users detail.", () => {

    before(() => {
        console.log("[Script: " + filename + "]")
    })

    it("Should return 404, user doesn't exist ", () => {
        return chai.request(SERVER_URL)
            .get("/users/:user_id")

            .then((res) => {
                expect(res).to.have.status(404)


            })
            .catch((err) => {
                throw err
            })
    })

})

describe("Reset Password", () => {
    before(() => {
        console.log("[Script: " + filename + "]");
    });

    it("Should return 200 when the password is successfully reset", () => {
        user_id; // Replace with the actual user ID for testing
        const newPassword = "newPassword123";

        return chai
            .request(SERVER_URL)
            .post("/users/resetPassword")
            .set('X-Authorization', ADMIN_TOKEN)
            .send({
                email: "user@example.com", // Replace with the user's email for testing
                password: "oldPassword123",
                newPassword: newPassword,
            })
            .then((res) => {
                expect(res).to.have.status(200);
            })
            .catch((err) => {
                throw err;
            });
    });

    it("Should return 404 when the email or password is incorrect", () => {
        return chai
            .request(SERVER_URL)
            .post("/users/resetPassword")
            .set('X-Authorization', ADMIN_TOKEN)
            .send({
                email: "user@example.com", // Replace with an incorrect email for testing
                password: "incorrectPassword",
                newPassword: "newPassword123",
            })
            .then((res) => {
                expect(res).to.have.status(400);
                expect(res.text).to.match(/"password" with value ".+" fails to match the required pattern/);

            })
            .catch((err) => {
                throw err;
            });
    });

    it("Should return 400 when the request body is invalid", () => {
        return chai
            .request(SERVER_URL)
            .post("/users/resetPassword")
            .set('X-Authorization', ADMIN_TOKEN)
            .send({
                email: "user@example.com", // Replace with the user's email for testing
                password: "oldPassword123",
                newPassword: "invalidPassword",
            })
            .then((res) => {
                expect(res).to.have.status(400);
            })
            .catch((err) => {
                throw err;
            });
    });
});
