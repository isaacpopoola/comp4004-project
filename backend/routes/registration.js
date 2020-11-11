const express = require("express");
const router = express.Router();

const Student = require("../db/models").Student;

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const newStudent = { username, password };

    Student.create(newStudent)
        .then(() =>
            res.status(201).send({ message: "Student created successfully" })
        )
        .catch((err) => {
            res.status(500).send({ message: "Error creating student" });
        });
});

module.exports = router;
