const express = require("express");
const router = express.Router();

const Students = require("../db/models").Students;
const Professors = require("../db/models").Professors

router.post("/register", async (req, res) => {
    const { username, password, name, type } = req.query;

    switch (type){
        case "Student":
            const newStudent = { username, password , name, gpa: 12.0};

            Students.create(newStudent)
                .then(() =>
                    res.status(201).send({ message: "User created successfully" })
                )
                .catch((err) => {
                    console.log(err);
                    res.status(500).send({ message: "Error creating student" });
                });
            break;
        case "Professor":
            const newProf = { username, password , name };

            Professors.create(newProf)
                .then(() =>
                    res.status(201).send({ message: "User created successfully" })
                )
                .catch((err) => {
                    console.log(err);
                    res.status(500).send({ message: "Error creating student" });
                });
        
            break;

        default:
            res.status(400).send({message: "Please use a valid User type (Student or Professor)"})
    }

});

module.exports = router;
