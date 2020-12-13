const express = require("express");
const router = express.Router();

const FinalGrades = require("../db/models").FinalGrades;
const Students = require("../db/models").Students;
const Courses = require("../db/models").Courses

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

router.post("/request_satunsat", async (req, res) => {
    const username = req.cookies.username;
    const { course_code } = req.body;

    let student = await Students.findOne({ where: { username } });
    if (!student) {
        return res.status(400).send({ message: "student does not exist" });
    } else {
        let grade = await FinalGrades.findOne({ raw: true, where: { course_code, student_id: student.id }})
        if (!grade){
            return res.status(400).send({ message: "Course not graded yet" });
        }
        var new_status = (grade.grade >= 50) ? "SAT" : "UNSAT"
        await FinalGrades.update({ grade: 0, status: new_status}, { where: { course_code, student_id: student.id }})
        return res.status(200).send({...grade, status: new_status, grade: 0});
        
    }

    
})

module.exports = router;
