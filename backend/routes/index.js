const express = require("express");
const registration = require("./registration");
const login = require("./login");
const course = require("./courses");
const delete_student = require("./delete_student");
const students = require("./students");
const course_registration = require("./course_registration");

const router = express.Router();

router.use("/register", registration);
router.use("/login", login);
router.use("/course", course);
router.use("/delete_student", delete_student);
router.use("/students", students);
router.use("/course_registration", course_registration);

module.exports = router;
