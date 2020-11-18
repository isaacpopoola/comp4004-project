const express = require("express");
const registration = require("./registration");
const delete_user = require("./delete_user");

const router = express.Router();

router.use("/register", registration);
router.use("/delete", delete_user);

module.exports = router;
