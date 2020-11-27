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
app.use(cors());
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

// db.Courses.sync({ force: true }).then(() => {
//     db.Students.sync({ force: true }).then(() => {
//         db.FinalGrades.sync({ force: true }).then(() => {
//             db.Deliverables.sync({ force: true }).then(() => {
//                 db.DeliverableGrades.sync({ force: true }).then(() => {
//                     db.Professors.sync({ force: true }).then(() => {
//                         db.ProfessorAssignedCourses.sync({
//                             force: true,
//                         }).then(() => {
//                             db.StudentRegisteredCourses.sync({
//                                 force: true,
//                             }).then(() => {
//                                 db.Administrators.sync({
//                                     force: true,
//                                 }).then(() => {});
//                             });
//                         });
//                     });
//                 });
//             });
//         });
//     });
// });

/* ROUTES */
app.use(router);

module.exports = app;
