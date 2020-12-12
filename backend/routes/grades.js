const express = require("express");
const router = express.Router();

const FinalGrades = require("../db/models").FinalGrades;
const Students = require("../db/models").Students;

router.get("/me", async (req, res) => {
    const username = req.cookies.username;

    const student = await Students.findOne({ where: { username } });

    if (!student)
        return res.status(400).send({ message: "student does not exist" });
    else {
        const finalGrades = await FinalGrades.findAll({
            where: { student_id: student.id },
        });
        return res.status(200).send({ finalGrades });
    }
});

module.exports = router;
