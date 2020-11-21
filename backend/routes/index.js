const express = require("express");
const registration = require("./registration");
const login = require("./login");
const course = require("./courses");

const router = express.Router();

router.use("/register", registration);
router.use("/login", login);
router.use("/course", course);
// router.use("/course/delete", cancel_course);

module.exports = router;
