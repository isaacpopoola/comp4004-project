const express = require("express");
const router = express.Router();

const Students = require("../db/models").Students;
const Professors = require("../db/models").Professors;

router.post("", async (req, res) => {
    const { username, password, name, type } = req.body;
    if (!username || !password || !name || !type)
        return res.status(400).send({ message: "missing field" });

    switch (type) {
        case "Student":
            const newStudent = { username, password, name, gpa: 12.0 };
            const studentExists = await Students.findOne({
                where: { username },
            });
            if (studentExists)
                return res
                    .status(400)
                    .send({ message: "Student already exists" });
            Students.create(newStudent)
                .then(() =>
                    res
                        .status(201)
                        .send({ message: "User created successfully" })
                )
                .catch((err) => {
                    console.log(err);
                    res.status(500).send({ message: "Error creating student" });
                });
            break;
        case "Professor":
            const newProf = { username, password, name };
            const profExists = await Professors.findOne({
                where: { username },
            });
            if (profExists)
                return res
                    .status(400)
                    .send({ message: "Professor already exists" });
            Professors.create(newProf)
                .then(() =>
                    res
                        .status(201)
                        .send({ message: "User created successfully" })
                )
                .catch((err) => {
                    console.log(err);
                    res.status(500).send({ message: "Error creating student" });
                });

            break;

        default:
            res.status(400).send({
                message: "Please use a valid User type (Student or Professor)",
            });
    }
});

module.exports = router;
