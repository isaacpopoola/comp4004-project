const express = require("express");
const router = express.Router();

const Students = require("../db/models").Students;
const Courses = require("../db/models").Courses
const StudentRegisteredCourses = require("../db/models").StudentRegisteredCourses


router.post("", async (req, res) => {

    const { username, course_code} = req.body;

    let today = new Date()

    let student = await Students.findOne({ where: { username } });
    let course = await Courses.findOne({ where: { course_code } });

    if (!student || !course) {
        return res.status(400).send({ message: "Student or Course does not exist" });
    }
    else if (today > course.course_registration_deadline) {
        return res.status(400).send({ message: "Registration deadline has passed" });
    }
    else {
        try {
            const student_registration = { student_id: student.id, course_code: course.course_code, section: "A" };

            StudentRegisteredCourses.create(student_registration)
            .then(() =>
                res.status(200).send({ message: "Student is now registered" })
            )
            .catch((err) => {
                console.log(err);
                res.status(400).send({ message: "Error registering for course" });
            });
        }
        catch {       
            res.status(400).send({ message: "Error registering for course" });
        }
    }

});

module.exports = router;