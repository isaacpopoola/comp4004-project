const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const Sequelize = require("sequelize");

const db = require("./db/models");

const app = express();

const router = require("./routes");

const API_PORT = process.env.API_PORT || 8080;

/* MIDDLEWARE */
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(logger("dev"));

const sequelize = new Sequelize("postgres", "postgres", "postgres", {
    dialect: "postgres",
    host: "localhost",
    port: 5432,
});

sequelize.authenticate().then(
    function (err) {
        console.log("Connection has been established successfully.");
    },
    function (err) {
        console.log("Unable to connect to the database:", err);
    }
);

db.Courses.sync({ force: true }).then(() => {
    db.Students.sync({ force: true }).then(() => {
        db.FinalGrades.sync({ force: true }).then(() => {
            db.Deliverables.sync({ force: true }).then(() => {
                db.DeliverableGrades.sync({ force: true }).then(() => {
                    db.Professors.sync({ force: true }).then(() => {
                        db.ProfessorAssignedCourses.sync({
                            force: true,
                        }).then(() => {
                            db.StudentRegisteredCourses.sync({
                                force: true,
                            }).then(() => {
                                db.Administrators.sync({
                                    force: true,
                                }).then(async () => {
                                    await db.Professors.create({
                                        username: "jeanpier",
                                        password: "jp",
                                        name: "JP",
                                    });
                                    await db.Students.create({
                                        username: "ryanduan",
                                        password: "pw",
                                        gpa: 12.0,
                                        name: "Ryan Duan",
                                        balance: 4938.24,
                                        is_approved: true,
                                    });

                                    await db.Students.create({
                                        username: "isaacpopoola",
                                        password: "pw",
                                        gpa: 12.0,
                                        name: "Isaac Popoola",
                                        balance: 0.0,
                                        is_approved: false,
                                    });

                                    await db.Administrators.create({
                                        username: "admin",
                                        password: "admin",
                                    });
                                    await db.Courses.create({
                                        course_code: "COMP4004",
                                        course_name:
                                            "Software Quality Assurance",
                                        course_descr:
                                            "A very interesting course",
                                        course_credits: 0.5,
                                        course_student_limit: 100,
                                        registered_students: 0,
                                        course_registration_deadline:
                                            "2020/12/25",
                                        course_drop_deadline: "2020/12/25",
                                        price: 1234.56,
                                        course_time: "10:00",
                                        course_duration: 1.5,
                                        course_day: "Monday, Wednesday",
                                    });
                                    await db.Courses.create({
                                        course_code: "COMP3004",
                                        course_name: "Software Engineering",
                                        course_descr:
                                            "A very interesting SWE course",
                                        course_credits: 0.5,
                                        course_student_limit: 10,
                                        registered_students: 1,
                                        course_registration_deadline:
                                            "2020/12/25",
                                        course_drop_deadline: "2020/12/25",
                                        price: 1234.56,
                                        course_time: "10:00",
                                        course_duration: 1.5,
                                        course_day: "Tuesday, Thursday",
                                    });
                                    await db.Courses.create({
                                        course_code: "COMP3000",
                                        course_name: "Software Engineering",
                                        course_descr:
                                            "A very interesting OS course",
                                        course_credits: 0.5,
                                        course_student_limit: 1,
                                        registered_students: 1,
                                        course_registration_deadline:
                                            "2020/1/1",
                                        course_drop_deadline: "2020/11/11",
                                        price: 1234.56,
                                        course_time: "11:30",
                                        course_duration: 1.5,
                                        course_day: "Wednesday, Friday",
                                    });
                                    await db.Courses.create({
                                        course_code: "COMP3005",
                                        course_name: "Databases",
                                        course_descr:
                                            "A very interesting DB course",
                                        course_credits: 0.5,
                                        course_student_limit: 10,
                                        registered_students: 1,
                                        course_registration_deadline:
                                            "2020/12/25",
                                        course_drop_deadline: "2020/12/25",
                                        price: 1234.56,
                                        course_time: "14:30",
                                        course_duration: 3,
                                        course_day: "Friday",
                                    });
                                    await db.Courses.create({
                                        course_code: "COMP4900",
                                        course_name:
                                            "Intro to Machine Learning",
                                        course_descr:
                                            "Intro to Machine Learning",
                                        course_credits: 1,
                                        course_student_limit: 10,
                                        registered_students: 0,
                                        course_registration_deadline:
                                            "2020/12/25",
                                        course_drop_deadline: "2020/12/25",
                                        price: 1234.56,
                                        course_time: "08:30",
                                        course_duration: 3,
                                        course_day: "Friday",
                                        prereqs: ["COMP4004"],
                                    });
                                    await db.Courses.create({
                                        course_code: "COMP4905",
                                        course_name: "Honours Project",
                                        course_descr: "Honours Project",
                                        course_credits: 1,
                                        course_student_limit: 10,
                                        registered_students: 0,
                                        course_registration_deadline:
                                            "2020/12/25",
                                        course_drop_deadline: "2020/12/25",
                                        price: 1234.56,
                                        course_time: "10:30",
                                        course_duration: 1.5,
                                        course_day: "Friday",
                                    });
                                    await db.StudentRegisteredCourses.create({
                                        student_id: 1,
                                        course_code: "COMP3000",
                                    });
                                    await db.StudentRegisteredCourses.create({
                                        student_id: 1,
                                        course_code: "COMP3004",
                                    });
                                    await db.StudentRegisteredCourses.create({
                                        student_id: 1,
                                        course_code: "COMP3005",
                                    });

                                    await db.Deliverables.create({
                                        course_code: "COMP4004",
                                        grade_weight: 100,
                                        description: "TDD/BDD Group Project",
                                        due_date: "2020/12/20 23:59",
                                        answer: "correct",
                                    });

                                    await db.Deliverables.create({
                                        course_code: "COMP3004",
                                        grade_weight: 100,
                                        description:
                                            "Design Patterns Assignment",
                                        due_date: "2020/12/21 23:59",
                                        answer: "correct",
                                    });

                                    await db.Deliverables.create({
                                        course_code: "COMP3005",
                                        grade_weight: 50,
                                        description: "SQL Assignment 1",
                                        due_date: "2020/12/22 23:59",
                                        answer: "correct",
                                    });

                                    await db.Deliverables.create({
                                        course_code: "COMP3005",
                                        grade_weight: 50,
                                        description: "SQL Assignment 2",
                                        due_date: "2020/11/22 23:59",
                                        answer: "correct",
                                    });

                                    await db.Deliverables.create({
                                        course_code: "COMP3000",
                                        grade_weight: 50,
                                        description: "Fork Bomb Experiment",
                                        due_date: "2020/12/23 23:59",
                                        answer: "correct",
                                    });

                                    await db.Deliverables.create({
                                        course_code: "COMP3000",
                                        grade_weight: 50,
                                        description:
                                            "Kill the Child Assignment",
                                        due_date: "2020/12/1 23:59",
                                        answer: "correct",
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

/* ROUTES */
app.use(router);

module.exports = app;
