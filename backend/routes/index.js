const express = require("express");
const registration = require("./registration");
const login = require("./login");
const course = require("./courses");
const delete_student = require("./delete_student");
const students = require("./students");
const course_registration = require("./course_registration");
const drop_course = require("./drop_course");
const cancel_course = require("./cancel_course");
const submit_deliverable = require("./submit_deliverable");
const finalGrades = require("./grades");

const router = express.Router();

router.use("/register", registration);
router.use("/login", login);
router.use("/course", course);
router.use("/delete_student", delete_student);
router.use("/students", students);
router.use("/course_registration", course_registration);
router.use("/drop_course", drop_course);
router.use("/cancel_course", cancel_course);
router.use("/submit_deliverable", submit_deliverable);
router.use("/finalGrades", finalGrades);

module.exports = router;
