const express = require("express");
const router = express.Router();

const Students = require("../db/models").Students;

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    // console.log(req);
    const newStudent = { username, password };

    Students.create(newStudent)
        .then(() =>
            res.status(201).send({ message: "Student created successfully" })
        )
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: "Error creating student" });
        });
});

module.exports = router;
