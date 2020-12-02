const express = require("express");
const router = express.Router();

const Students = require("../db/models").Students;
const Courses = require("../db/models").Courses;
const DeliverableGrades = require("../db/models").DeliverableGrades;
const StudentRegisteredCourses = require("../db/models")
    .StudentRegisteredCourses;
const FinalGrades = require("../db/models").FinalGrades;

router.post("", async (req, res) => {
    let today = new Date();
    const username = req.cookies.username;

    const { course_code } = req.body;

    let student = await Students.findOne({ where: { username } });
    let course = await Courses.findOne({ where: { course_code } });

    if (!student || !course) {
        return res
            .status(400)
            .send({ message: "Student or Course does not exist" });
    } else {
        try {
            // delete course records
            DeliverableGrades.destroy({
                where: {
                    student_id: student.id,
                    course_code: course.course_code,
                },
            });
            StudentRegisteredCourses.destroy({
                where: {
                    student_id: student.id,
                    course_code: course.course_code,
                },
            });
            Courses.update(
                { registered_students: course.registered_students - 1 },
                { where: { course_code: course.course_code } }
            );

            // set final grade as withdrawn if past deadline
            if (
                course.course_drop_deadline &&
                today > course.course_drop_deadline
            ) {
                let final_grade = {
                    student_id: student.id,
                    course_code: course.course_code,
                    status: "WITHDRAWN",
                };
                FinalGrades.create(final_grade);
            }

            return res
                .status(200)
                .send({ message: "Student has been withdrawn from course" });
        } catch {
            return res.status(400).send({ message: "Error dropping course" });
        }
    }
});

module.exports = router;
