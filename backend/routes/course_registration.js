const express = require("express");
const router = express.Router();

const Students = require("../db/models").Students;
const Courses = require("../db/models").Courses;
const StudentRegisteredCourses = require("../db/models")
    .StudentRegisteredCourses;

router.post("", async (req, res) => {
    const username = req.cookies.username;
    const { course_code } = req.body;

    let today = new Date();

    let student = await Students.findOne({ where: { username } });
    let course = await Courses.findOne({ where: { course_code } });

    if (!student || !course) {
        return res
            .status(400)
            .send({ message: "Student or Course does not exist" });
    } else if (
        course.course_registration_deadline &&
        today > course.course_registration_deadline
    ) {
        return res
            .status(400)
            .send({ message: "Registration deadline has passed" });
    } else if (course.registered_students >= course.course_student_limit) {
        return res.status(400).send({ message: "Course is full" });
    } else {
        let student_registration = {
            student_id: student.id,
            course_code: course.course_code,
        };
        try {
            // register
            StudentRegisteredCourses.create(student_registration);
            Courses.update(
                { registered_students: course.registered_students + 1 },
                { where: { course_code: course.course_code } }
            );

            // deregister if over the limit
            let course_after = Courses.findOne({ where: { course_code } });
            if (
                course_after.registered_students >=
                course_after.course_student_limit
            ) {
                StudentRegisteredCourses.destroy({
                    where: { student_id: student.id, course_code: course_code },
                });
                Courses.update(
                    { registered_students: course_after.course_student_limit },
                    { where: { course_code: course.course_code } }
                );

                return res.status(400).send({ message: "Course is full" });
            } else {
                return res
                    .status(200)
                    .send({ message: "Student is now registered" });
            }
        } catch {
            return res.status(400).send({ message: "Error dropping course" });
        }
    }
});

module.exports = router;
