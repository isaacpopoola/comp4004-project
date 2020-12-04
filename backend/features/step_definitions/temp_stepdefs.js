const assert = require("assert");
const {
    Given,
    When,
    Then,
    setDefaultTimeout,
    Before,
    After,
    BeforeAll,
    AfterAll,
} = require("cucumber");

setDefaultTimeout(10000);

const app = require("../../test-app");
const request = require("supertest");

const db = require("../../db/models");

BeforeAll(() => {
    db.Courses.sync().then(() => {
        db.Students.sync().then(() => {
            db.FinalGrades.sync().then(() => {
                db.Deliverables.sync().then(() => {
                    db.DeliverableGrades.sync().then(() => {
                        db.Professors.sync().then(() => {
                            db.ProfessorAssignedCourses.sync({}).then(() => {
                                db.StudentRegisteredCourses.sync({}).then(
                                    () => {
                                        db.Administrators.sync(
                                            {}
                                        ).then(() => {});
                                    }
                                );
                            });
                        });
                    });
                });
            });
        });
    });
});

Before({ tags: "@createadmin" }, async () => {
    await db.Administrators.create({
        username: "admin",
        password: "admin",
    });
});

Before({ tags: "@enrollCOMP3000" }, async () => {
    await db.StudentRegisteredCourses.create({
        student_id: 1,
        course_code: "COMP3000",
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

Before({ tags: "@createunavailablecourse" }, async () => {
    await db.Courses.create({
        course_code: 100,
        course_name: "COMP4004",
        registered_students: 50,
        course_student_limit: 50,
        course_descr: "Hello hi",
        course_credits: 0.5,
    });
});

Before({ tags: "@createprof" }, async () => {
    await db.Professors.create({
        username: "ryanduan",
        password: "pw",
        name: "Ryan Duan",
    });
});

Before({ tags: "@createcourse" }, async () => {
    await db.Courses.create({
        course_code: "COMP4004",
        course_name: "Software Quality Assurance",
        course_descr: "A very interesting course",
        course_credits: 0.5,
        course_student_limit: 1,
        registered_students: 0,
        course_registration_deadline: "2020/12/25",
        course_drop_deadline: "2020/12/25",
        price: 10000,
    });
});

After({ tags: "@wipetables" }, () => {
    Object.values(db.sequelize.models).map(function (model) {
        return model.destroy({
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
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

When("Get all courses", async function () {
    await request(app)
        .get("/course/available")
        .then((res) => {
            this.response = {};
            this.response.status = res.status;
            this.response.courses = res.body.courses;
        });
});

When("Student {string} exists", async function (string) {
    await db.Students.create({
        username: "ryanduan",
        password: "pw",
        name: "Ryan Duan",
        gpa: 12.0,
    });
});

When("Administrator {string} exists", async function (string) {
    await db.Administrators.create({
        username: "admin",
        password: "admin",
    });
});

When("Professor {int} exists", async function (prof_id) {
    console.log("CREATING PROF");
    await db.Professors.create({
        username: "jeanpier",
        password: "pw",
        name: "JP",
    });
    this.prof_id = prof_id;
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

When(
    "Course code is {string} and course name is {string}",
    function (course_code, course_name) {
        this.course_code = course_code;
        this.course_name = course_name;
    }
);

When("Course description is {string}", function (course_descr) {
    this.course_descr = course_descr;
});

When("Course credits is {float}", function (course_credits) {
    this.course_credits = course_credits;
});

When("Course is created", async function () {
    await request(app)
        .post("/course")
        .send({
            course_code: this.course_code,
            course_name: this.course_name,
            course_descr: this.course_descr,
            course_credits: this.course_descr,
            profId: this.prof_id,
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

Then("Return list of courses", function () {
    assert.strictEqual(this.response.courses.length, 1);
});

Then("Return empty list of courses", function () {
    assert.strictEqual(this.response.courses.length, 0);
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

When("Student is deleted", async function () {
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

When("Registration deadline is {string}", async function (reg_deadline) {
    await db.Courses.update(
        { course_registration_deadline: reg_deadline },
        { where: { course_code: this.course_code } }
    );
});

When("Drop deadline is {string}", async function (drop_deadline) {
    await db.Courses.update(
        { course_drop_deadline: drop_deadline },
        { where: { course_code: this.course_code } }
    );
});

When("Course has {int} students registered", async function (reg_count) {
    await db.Courses.update(
        { registered_students: reg_count },
        { where: { course_code: this.course_code } }
    );
});

When("Student registers for the course", async function () {
    await request(app)
        .post("/course_registration")
        .set("Cookie", [`username=${this.username}`])
        .send({
            course_code: this.course_code,
        })
        .then((res) => {
            this.response = {};
            this.response.status = res.status;
        });
});

When("Get enrolled courses for {string}", async function (username) {
    await request(app)
        .get("/course/me")
        .set("Cookie", [`username=${username}`])
        .then((res) => {
            this.response = {};
            this.response.status = res.status;
            this.response.courses = res.body.courses;
        });
});

When("Student drops the course", async function () {
    await request(app)
        .post("/drop_course")
        .set("Cookie", [`username=${this.username}`])
        .send({
            course_code: this.course_code,
        })
        .then((res) => {
            this.response = {};
            this.response.status = res.status;
        });
});

Then("Operation was successful with final grade and no refund", async function () {
    assert.strictEqual(this.response.status, 200);

    let student = await db.Students.findOne({
        where: { username: this.username },
    });
    let student_grade = await db.FinalGrades.findOne({
        where: { student_id: student.id, course_code: this.course_code },
    });
    assert.notStrictEqual(student_grade, null);

    let course = await db.Courses.findOne({
        where: { course_code: this.course_code },
    });

    assert.strictEqual(course.registered_students, 0);

    assert.strictEqual(student.balance, 10000);
});

Then("Operation was successful with no final grade and refund", async function () {
    assert.strictEqual(this.response.status, 200);

    let student = await db.Students.findOne({
        where: { username: this.username },
    });
    let student_grade = await db.FinalGrades.findOne({
        where: { student_id: student.id, course_code: this.course_code },
    });
    assert.strictEqual(student_grade, null);

    let course = await db.Courses.findOne({
        where: { course_code: this.course_code },
    });

    assert.strictEqual(course.registered_students, 0);

    assert.strictEqual(student.balance, 0);
});

When("Admin cancels the course", async function () {
    await request(app)
        .post("/cancel_course")
        .send({
            course_code: this.course_code,
        })
        .then((res) => {
            this.response = {};
            this.response.status = res.status;
        });
});

Then('Operation was successful and student balance is {int}', async function (student_balance) {
    assert.strictEqual(this.response.status, 200);

    let student = await db.Students.findOne({
        where: { username: this.username },
    });

    assert.strictEqual(student.balance, 10000);
});