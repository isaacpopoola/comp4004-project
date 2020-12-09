const express = require("express");
const router = express.Router();

const Students = require("../db/models").Students;
const Courses = require("../db/models").Courses;
const StudentRegisteredCourses = require("../db/models").StudentRegisteredCourses;

router.get("/all", async (req, res) => {
    try {
        const students = await Students.findAll();
        return res.status(200).send({ students });
    } catch {
        return res.status(400).send({ message: "error retrieving students" });
    }
});

router.get("/me", async (req, res) => {
    try {
        const username = req.cookies.username;
        let student = await Students.findOne({ where: { username }, attributes: ["id", "balance"]});

        if (!student) {
            return res
                .status(400)
                .send({ message: "Student does not exist" });
        }
        
        let courses = await StudentRegisteredCourses.findAll({
            raw: true,
            where: { student_id: student.id},
            attributes: ["course_code"]
        });

        for (var i = 0; i < courses.length; i++){
            prices = await Courses.findOne({
                where: { course_code: courses[i].course_code},
                attributes: ["price", "course_name"]
            })
            courses[i]["price"] = prices.price
            courses[i]["course_name"] = prices.course_name
        }

        return res.status(200).send({ student, courses });
    } catch(err) {
        console.error(err)
        return res.status(400).send({ message: "error retrieving student" });
    }
})

module.exports = router;
