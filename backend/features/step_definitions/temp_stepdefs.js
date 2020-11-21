const assert = require("assert");
const {
    Given,
    When,
    Then,
    setDefaultTimeout,
    Before,
    After,
} = require("cucumber");

setDefaultTimeout(10000);

const app = require("../../test-app");
const request = require("supertest");

const db = require("../../db/models");

Before({ tags: "@createadmin" }, async () => {
    await db.Administrators.create({
        username: "admin",
        password: "admin",
    });
});

Before({ tags: "@createstudent" }, async () => {
    await db.Students.create({
        username: "ryanduan",
        password: "pw",
        gpa: 12.0,
        name: "Ryan Duan",
    });
});

After({ tags: "@wipetables" }, () => {
    Object.values(db.sequelize.models).map(function (model) {
        return model.destroy({ truncate: true, cascade: true });
    });
});

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

When("Student {string} exists", function (string) {
    db.Students.create({
        username: "ryanduan",
        password: "pw",
        name: "Ryan Duan",
        gpa: 12.0,
    });
});

When("Administrator {string} exists", function (string) {
    db.Administrators.create({
        username: "admin",
        password: "admin",
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

When("Get all students", async function () {
    await request(app)
        .get("/students/all")
        .then((res) => {
            this.response = {};
            this.response.status = res.status;
            this.response.students = res.body.students;
        });
});

Then("Return list of students", function () {
    assert.strictEqual(this.response.students.length, 1);
});

Then("Return empty list of students", function () {
    assert.strictEqual(this.response.students.length, 0);
});

Then("Operation was successful", function () {
    assert.strictEqual(this.response.status, 200);
});

Then("Operation was unsuccessful", function () {
    assert.strictEqual(this.response.status, 400);
});

Then("New user is added to the database", function () {
    request(app)
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

When('Student is deleted', async function () {
    await request(app)
        .post("/delete_student")
        .send({
            username: this.username,
        })
        .then((res) => {
            this.response = {};
            this.response.status = res.status;
        });
});
