const express = require("express");
const router = express.Router();

const Students = require("../db/models").Students;
const DeliverableGrades = require("../db/models").DeliverableGrades
const FinalGrade = require("../db/models").FinalGrades
const StudentRegisteredCourses = require("../db/models").StudentRegisteredCourses
const Courses = require("../db/models").Courses;


router.post("", async (req, res) => {

    const { username } = req.body;


    let student = await Students.findOne({ where: { username } });

    if (student == null) {
        return res.status(400).send({ message: "Student does not exist" });
    }
    else {
        try {
            DeliverableGrades.destroy({ where: { student_id: student.id } });
    
            FinalGrade.destroy({ where: { student_id: student.id } });

            //decrement registeered students count in courses table
            let registed_courses = await StudentRegisteredCourses.findAll({ where: { student_id: student.id } });

            for (i = 0; i < registed_courses.length; ++i) {
                let curr_course = await Courses.findOne({ where: { course_code: registed_courses[i].course_code } });
                let new_count = curr_course.registered_students - 1
                await Courses.update(
                    { registered_students: new_count },
                    { where: { course_code: curr_course.course_code } }
                );
            }

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