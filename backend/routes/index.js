const express = require("express");
const registration = require("./registration");

const router = express.Router();

router.use("/register", registration);

module.exports = router;
