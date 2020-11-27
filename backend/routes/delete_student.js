const express = require("express");
const router = express.Router();

const Students = require("../db/models").Students;
const DeliverableGrades = require("../db/models").DeliverableGrades
const FinalGrade = require("../db/models").FinalGrades
const StudentRegisteredCourses = require("../db/models").StudentRegisteredCourses


router.post("", async (req, res) => {

    const { username } = req.body;

    let student = await Students.findOne({ where: { username } });

    if (!student) {
        return res.status(400).send({ message: "Student does not exist" });
    }
    else {
        try {
            DeliverableGrades.destroy({ where: { student_id: student.id } });
    
            FinalGrade.destroy({ where: { student_id: student.id } });

            StudentRegisteredCourses.destroy({ where: { student_id: student.id } });
    
            Students.destroy({ where: { id: student.id } });
        }
        catch {       
            return res.status(400).send({ message: "Error deleting student" });
        }
    }

    return res.status(200).send({ message: "Student deleted successfully" });

});

module.exports = router;