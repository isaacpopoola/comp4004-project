const express = require("express");
const registration = require("./registration");
const login = require("./login");

const router = express.Router();

router.use("/register", registration);
router.use("/login", login);

module.exports = router;
