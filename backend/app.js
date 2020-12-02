const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Sequelize = require("sequelize");

const db = require("./db/models");

const app = express();

const router = require("./routes");

const API_PORT = process.env.API_PORT || 8080;

/* MIDDLEWARE */
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

//this wasn't syncing the tables in the right order
// db.sequelize.sync({ force: false }).then(() => {
//     console.log("Drop and re-sync db.");
// });
// db.Courses.sync({ force: true}).then(() => {
//     db.Students.sync({ force: true}).then(() => {
//         db.Professors.sync({ force: true}).then(() => {
//             db.Administrators.sync({ force: true}).then();

//             db.Deliverables.sync({ force: true}).then(() => {
//                 db.DeliverableGrades.sync({ force: true}).then();
//             });

//             db.FinalGrades.sync({ force: true}).then();

//             db.ProfessorAssignedCourses.sync({ force: true}).then();

//             db.StudentRegisteredCourses.sync({ force: true}).then();
//         });

//     });

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
                                    await db.Students.create({
                                        username: "ryanduan",
                                        password: "pw",
                                        gpa: 12.0,
                                        name: "Ryan Duan",
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
