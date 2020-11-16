const express = require("express");
const router = express.Router();

const Students = require("../db/models").Students;
const Professors = require("../db/models").Professors

router.post("/register", async (req, res) => {
    const { username, password, fname, lname, type } = req.body;
    // console.log(req);

    switch (type){
        case "Student":
            const newStudent = { username, password ,  };

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
            const newProf = { username, password };

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
