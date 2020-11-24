const express = require("express");
const router = express.Router();

const Courses = require("../db/models").Courses
const DeliverableGrades = require("../db/models").DeliverableGrades
const Deliverables = require("../db/models").Deliverables
const StudentRegisteredCourses = require("../db/models").StudentRegisteredCourses


router.post("", async (req, res) => {

    const { course_code} = req.body;

    let course = await Courses.findOne({ where: { course_code } });
    
    if (!course) {
        return res.status(400).send({ message: "Course does not exist" });
    }
    else {
        try {
            // delete course records
            DeliverableGrades.destroy({ where: { course_code } });
            StudentRegisteredCourses.destroy({ where: { course_code } });
            Deliverables.destroy({ where: { course_code } });
            Courses.destroy({ where: { course_code } });
    
            return res.status(200).send({ message: "Course has been canceled" });
        }
        catch {       
            return res.status(400).send({ message: "Error canceling course" });
        }
    }
});

module.exports = router;