const assert = require("assert");
const { Given, When, Then, setDefaultTimeout } = require("cucumber");

setDefaultTimeout(10000);

const app = require("../../test-app");
const request = require("supertest");

Given("Express Server is running and address is {string}", function (address) {
    //checks if the server is running, page doesn't exist...but the server works
    this.address = address;

    request(app)
        .get("/")
        .then((resp) => {
            assert.ok;
        })
        .catch((err) => {
            assert.fail;
        });
});

When("Username is {string}", function (username) {
    this.username = username;
});

When("Password is {string}", function (password) {
    this.password = password;
});

When("Full name is {string}", function (name) {
    this.name = name;
});

When("Type of user is {string}", function (type) {
    this.type = type;
});

When("Data is sent to {string}", function (endpoint) {
    this.endpoint = endpoint;
});

When("logs in", async function () {
    await request(app)
        .post("/login")
        .send({
            username: this.username,
            password: this.password,
            type: this.type,
        })
        .then((res) => {
            this.response = {};
            this.response.status = res.status;
        });
});


When('Course code is {string} and course name is {string}', function (course_code, course_name) {
    this.course_code = course_code;
    this.course_name = course_name;
});

When('Professor ID is {int}', function (prof_id) {
    this.prof_id = prof_id;
});

When('Course description is {string}', function (course_descr) {
    this.course_descr = course_descr
});

When('Course credits is {float}', function (course_credits) {
    this.course_credits = course_credits;
});

Then("Course is created", async function () {
   await request(app)
        .post("/course")
        .send({
           course_code: this.course_code,
           course_name: this.course_name,
           course_descr: this.course_descr,
           course_credits: this.course_descr,
           profId: this.prof_id
        })
        .then((res) => {
            this.response = {};
            this.response.status = res.status;
            console.log(res);
        });
});

Then("Operation was successful", function () {
    assert.strictEqual(this.response.status, 200);
});

Then("Operation was unsuccessful", function () {
    assert.strictEqual(this.response.status, 400);
});

Then("New user is added to the database", async function () {
    await request(app)
        .post(
            `/${this.endpoint}?username=${this.username}&password=${this.password}&name=${this.name}&type=${this.type}`
        )
        .then((resp) => {
            assert.strictEqual(response.status, 201);
            assert.strictEqual(
                response.data.message,
                "User created successfully"
            );
        })
        .catch((err) => {
            assert.fail;
        });
});
